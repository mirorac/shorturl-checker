const snoowrap = require("snoowrap");
const fs = require("fs");
const https = require("https");

// configure the snoowrap library with the Reddit API credentials
const r = new snoowrap({
  userAgent: "ShortenedUrlSafetyCheck/v0.1",
  clientId: "YGLxRNgiZlpyVII1aOk_5Q",
  clientSecret: "h1UbFVhIvP6pkRHtmmJXU-2u02SA5A",
  username: "url-safety-check-bot",
  password: "qYiHf#t!bL923HX",
});

// helper function to write latest post id to file
const writeToFile = (id) => {
  fs.appendFile("visited_posts.txt", id + "\n", (err) => {
    if (err) throw err;
    console.log(`Saved post id: ${id}`);
  });
};

// function to run the bot
const runBot = async () => {
  try {
    // get the last posts ids from the file
    let visitedPosts = [];
    try {
      visitedPosts = fs.readFileSync("visited_posts.txt", "utf-8").split("\n");
    } catch (e) {
      console.log("No last post id found");
    }

    // get the blacklisted usernames
    let blacklistedUsernames = [];
    try {
      blacklistedUsernames = fs
        .readFileSync("blacklisted_users.txt", "utf-8")
        .split("\n");
    } catch (e) {
      console.log("No blacklisted users found");
    }

    // search for new posts containing "tinyurl.com"
    const posts = await r.search({
      query: "tinyurl.com",
      limit: 10,
      sort: "top",
      time: "day",
    });

    // reply to each post with warning about shortened urls
    for (const post of posts) {
      if (visitedPosts.includes(post.id)) {
        console.log("Skipped post, already seen", post.id);
        continue;
      }
      if (blacklistedUsernames.includes(post.subreddit_name_prefixed)) {
        console.log(
          "Skipped post, blacklisted",
          post.id,
          post.subreddit_name_prefixed
        );
        continue;
      }
      console.log("===");
      console.log("Link: ", "https://reddit.com" + post.permalink);
      const urls = extractShortenedUrls(post);
      if (urls.length) {
        const results = await checkUrls(urls);
        let commentBody =
          "I am checking the safety of shortened URLs for you:\n\n";
        results.forEach((headers, i) => {
          const location = headers["result"]["location"];
          let safetyJudgement = "";
          if (location.startsWith("https://")) {
            safetyJudgement = "  - ✅ The location uses a secure connection.";
          } else {
            safetyJudgement =
              "  - ⚠️ The location does not use a secure connection! Do not input any sensitive information.";
          }
          const encodedUrl = encodeURI(addProtocol(urls[i]));
          // commentBody += `\n- ${removeProtocol(
          //   urls[i]
          // )} - Read the [full a report on the URL safety](https://tinyurl-checker.web.app/?url=${encodedUrl}) \n${safetyJudgement}\n  - It leads to [${location}](${location})`;
          commentBody +=
            safetyJudgement +
            `\n - Read the [full a report on the URL safety](https://tinyurl-checker.web.app/?url=${encodedUrl})`;
        });
        console.log(commentBody);
        await post.reply(commentBody);
      } else {
        console.log("no tinyurl");
      }
      writeToFile(post.id);
    }
  } catch (e) {
    console.error(e);
  }
};

const extractShortenedUrls = (post) => {
  const tinyUrls = [];
  const titleMatch = post.title.match(/tinyurl\.com\/\w+/g);
  const bodyMatch = post.selftext.match(/tinyurl\.com\/\w+/g);
  if (titleMatch) tinyUrls.push(...titleMatch);
  if (bodyMatch) tinyUrls.push(...bodyMatch);
  return tinyUrls;
};

const checkUrls = (urls) =>
  new Promise((resolve) => {
    let results = [];
    let count = 0;

    urls.forEach((url) => {
      const options = {
        hostname: "us-central1-shorturl-checker.cloudfunctions.net",
        path: "/check",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          count += 1;
          results.push(JSON.parse(data));
          if (count === urls.length) resolve(results);
        });
      });

      const postData = JSON.stringify({
        data: { type: "url", url: addProtocol(url) },
      });
      req.write(postData);
      req.end();
    });
  });

const addProtocol = (url) => {
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  if (!url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};

const removeProtocol = (url) => {
  if (url.startsWith("http://")) {
    return url.replace("http://", "");
  }
  if (url.startsWith("https://")) {
    return url.replace("https://", "");
  }
  return url;
};

// run the bot
runBot();

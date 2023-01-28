<template>
  <div class="bg-white" itemscope itemtype="https://schema.org/FAQPage">
    <div class="mx-auto max-w-7xl px-6 pt-24 pb-10 lg:px-8">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          FAQ
        </h2>
        <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
          <div
            v-for="faq in faqs"
            :key="faq.question"
            class="pt-6"
            itemscope
            itemprop="mainEntity"
            itemtype="https://schema.org/Question"
          >
            <dt
              class="flex w-full items-start justify-between text-left text-gray-900"
            >
              <h2 class="text-base font-semibold leading-7" itemprop="name">
                {{ faq.question }}
              </h2>
            </dt>
            <dd
              class="mt-2 pr-12"
              itemscope
              itemprop="acceptedAnswer"
              itemtype="https://schema.org/Answer"
            >
              <p class="text-base leading-7 text-gray-600" itemprop="text">
                {{ faq.answer }}
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: 'Is a link checker safe to use?',
    answer:
      "Yes, this website's link checker is safe to use. It is simply a tool for decoding the destination of a shortened URL and does not collect any personal information or harm your device in any way.",
  },
  {
    question: 'Is your website a short URL checker?',
    answer:
      'Yes, our website is a short URL checker that allows users to uncover the destination of a shortened URL provided by TinyURL.',
  },
  {
    question: 'How does this website work?',
    answer:
      'Users can enter a TinyURL into the provided field on the website and the website will show them the destination of the shortened URL.',
  },
  {
    question: 'Does your website also work as a Bitly checker?',
    answer:
      'This website is specifically designed to work with TinyURL. If you wish to preview the destination of a shortened URL from Bitly, you may need to use a different tool.',
  },
  {
    question: 'Can I use your website as a URL redirect checker?',
    answer:
      'Yes, our website can be used as a URL redirect checker. It allows users to enter a shortened URL and preview the destination of the redirect. This can help users ensure the safety of links from untrusted sources.',
  },
  {
    question: 'What should I do if I find a suspicious link?',
    answer:
      'If you find a link that you suspect may be harmful, do not click on it and report it to the appropriate authorities. This website is simply a tool for uncovering the destination of a shortened URL and should not be used as a substitute for careful internet browsing habits and good judgement.',
  },
  {
    question:
      'Does this website check the SSL certificate of the checked location?',
    answer:
      'Yes, this website checks the SSL certificate of the checked location to ensure the security and authenticity of the website.',
  },
  {
    question: 'What information does the SSL certificate check provide?',
    answer:
      "The SSL certificate check provides information on the authenticity and validity of the website's SSL certificate, including the issuing authority, the expiration date, and the website's identity.",
  },
  {
    question: 'What does it mean if the SSL certificate check fails?',
    answer:
      "If the SSL certificate check fails, it means that the website's SSL certificate is either not valid, not trusted, expired or the website's identity can't be verified. It is recommended not to proceed with browsing the website as it could be a phishing website or a website with malicious intent.",
  },
  {
    question:
      'Is it enough to rely on the SSL check to ensure the safety of the website?',
    answer:
      "The SSL check provides important information about the security of the website, but it is not a guarantee of safety. It is still important to exercise caution and use good judgement when browsing the internet. Additionally, it is important to keep your browser and operating system updated, as well as using anti-virus software, to ensure your device's security.",
  },
]
</script>

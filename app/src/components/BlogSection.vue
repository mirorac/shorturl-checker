<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          From the blog
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Learn about checking url safety
        </p>
      </div>
      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="flex max-w-xl flex-col items-start justify-between"
        >
          <div class="flex items-center gap-x-4 text-xs">
            <time :datetime="post.datetime" class="text-gray-500">{{
              post.date
            }}</time>
            <span
              class="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
              >{{ post.category.title }}</span
            >
          </div>
          <div class="group relative">
            <h3
              class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
            >
              <RouterLink as="a" :to="post.to">
                <span class="absolute inset-0" />
                {{ post.title }}
              </RouterLink>
            </h3>
            <p class="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
              {{ post.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const posts = [
  {
    id: 1,
    title: 'Is TinyURL Safe? A Comprehensive Guide to URL Safety Checks',
    to: { name: 'article-safe-url' },
    description: `In this guide, we will discuss the importance of checking short URLs for
        safety, the dangers of using shortened URLs without verifying the
        target, and how to use a URL security check to ensure the
        safety of short URLs.`,
    date: 'Feb 25, 2023',
    datetime: '2023-02-25',
    category: { title: 'Safety', href: '#' },
  },
]
</script>

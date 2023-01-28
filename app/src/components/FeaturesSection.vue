<template>
  <div class="overflow-hidden bg-white py-12">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div class="lg:pr-8 lg:pt-4">
          <div class="lg:max-w-lg">
            <h2
              class="text-lg font-semibold leading-8 tracking-tight text-emerald-600"
            >
              Browse safer
            </h2>
            <p
              class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Stay protected with TinyURL Checker
            </p>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Our tool not only helps you uncover the target URL of a shortened
              link, but also checks the security of the connection.
            </p>
            <dl
              class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
            >
              <div
                v-for="feature in features"
                :key="feature.name"
                class="relative pl-9"
              >
                <dt class="inline font-semibold text-gray-900">
                  <component
                    :is="feature.icon"
                    class="absolute -top-1 -left-1 w-8 text-emerald-600"
                    aria-hidden="true"
                  />
                  {{ feature.name }}
                </dt>
                {{ ' ' }}
                <dd class="block">{{ feature.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <img
          src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
          alt="Product screenshot"
          class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          width="2432"
          height="1442"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Open20Regular as PreviewIcon2,
  LockClosed12Regular as SSLIcon,
} from '@vicons/fluent'
import { Link as PreviewIcon } from '@vicons/tabler'
const features = [
  {
    name: 'Uncover Target URL',
    description:
      'Easily preview the final destination of a shortened link before clicking on it.',
    icon: PreviewIcon,
  },
  {
    name: 'Check Secure Connection',
    description:
      "We verify the security of the connection by checking the SSL certificate of the destination website. Rest assured that the website you're visiting is safe and secure.",
    icon: SSLIcon,
  },
]
</script>

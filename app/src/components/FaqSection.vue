<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 pt-24 pb-10 lg:px-8">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          FAQ
        </h2>
        <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
          <Disclosure
            as="div"
            v-for="faq in faqs"
            :key="faq.question"
            class="pt-6"
            v-slot="{ open }"
          >
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900"
              >
                <span class="text-base font-semibold leading-7">{{
                  faq.question
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <ToggleIcon
                    class="h-6 w-6"
                    :class="{ 'rotate-180': open }"
                    aria-hidden="true"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p class="text-base leading-7 text-gray-600">{{ faq.answer }}</p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDown12Filled as ToggleIcon } from '@vicons/fluent'

const faqs = [
  {
    question: 'What is the purpose of this website?',
    answer:
      'This website allows users to preview the destination of a shortened URL provided by TinyURL, helping people to ensure the safety of links from untrusted sources.',
  },
  {
    question: 'How does this website work?',
    answer:
      'Users can enter a TinyURL into the provided field on the website and the website will redirect them to the destination of the shortened URL.',
  },
  {
    question: 'Is this website safe to use?',
    answer:
      'Yes, this website is safe to use. It is simply a tool for previewing the destination of a shortened URL and does not collect any personal information or harm your device in any way.',
  },
  {
    question: 'Can I use this website for any other shortening service?',
    answer:
      'This website is specifically designed to work with TinyURL. If you wish to preview the destination of a shortened URL from a different service, you may need to use a different tool.',
  },
  {
    question: 'What should I do if I find a suspicious link?',
    answer:
      'If you find a link that you suspect may be harmful, do not click on it and report it to the appropriate authorities. This website is simply a tool for previewing the destination of a shortened URL and should not be used as a substitute for careful internet browsing habits and good judgement.',
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

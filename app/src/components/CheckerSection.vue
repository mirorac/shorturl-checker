<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl py-16 px-6 sm:pt-24 lg:px-8">
      <div class="text-center">
        <h1
          class="mt-1 text-4xl font-bold tracking-tight text-emerald-500 sm:text-5xl"
        >
          Stay Safe Online:
          <span class="text-gray-800">Preview Shortened URLs</span>
        </h1>
        <h2 class="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          Protect yourself from malicious links for free. Paste the TinyURL link
          below and uncover where it leads.
        </h2>
      </div>
      <div
        ref="checker"
        id="checker"
        class="mx-auto w-full max-w-xl pt-20 pb-10"
      >
        <form
          class="mt-5 sm:flex sm:items-center"
          @submit.prevent="executeCheck"
        >
          <div class="w-full">
            <label for="url" class="sr-only">TinyURL</label>
            <div class="">
              <input
                v-model="url"
                autocomplete="off"
                type="url"
                name="url"
                class="block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="Click and paste the TinyURL here"
              />
            </div>
          </div>
          <button
            type="submit"
            class="mt-3 inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto"
            @click.prevent="executeCheck"
          >
            Check URL for free
          </button>
        </form>

        <div v-if="error" class="mt-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <ErrorIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
            </div>
          </div>
        </div>

        <div v-if="sslError" class="mt-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <ErrorIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ sslError }}</h3>
            </div>
          </div>
        </div>

        <div
          v-if="urlFetching"
          class="mt-4 flex flex-col items-center justify-center text-center"
        >
          <LoadingIcon class="w-12 animate-spin text-gray-500" />
          <span class="mt-2 inline-block text-sm font-medium">
            Uncovering the destination...
          </span>
        </div>

        <div v-if="uncoveredUrl" class="mt-4 rounded-md bg-blue-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <InfoIcon class="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
            <div class="ml-3 block w-full">
              <p class="break-words text-sm text-blue-700">
                <span class="inline-block pb-1">This TinyURL leads to:</span
                ><br />
                <a
                  :href="uncoveredUrl"
                  class="font-medium underline hover:no-underline"
                  >{{ uncoveredUrl }}</a
                >
              </p>
            </div>
          </div>
        </div>

        <div v-if="ssl" class="mt-4 rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <OKIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                The destination uses a secure connection.
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>
                  Remember that secure connection is not a guarantee of safety.
                  It is still important to exercise caution and use good
                  judgement when browsing the internet.
                </p>
              </div>
              <div class="prose prose-sm mt-4 text-green-700">
                <ul role="list">
                  <li>
                    Issuer country:
                    <span class="font-medium">{{ ssl.issuer.C }}</span>
                  </li>
                  <li>
                    Issuer common name:
                    <span class="font-medium">{{ ssl.issuer.CN }}</span>
                  </li>
                  <li>
                    Issuer organization:
                    <span class="font-medium">{{ ssl.issuer.O }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="sslFetching"
          class="mt-4 flex flex-col items-center justify-center text-center"
        >
          <LoadingIcon class="w-12 animate-spin text-gray-500" />
          <span class="mt-2 inline-block text-sm font-medium">
            Checking whether the destination is secure
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { check } from '~/plugins/firebase/functions'
import {
  Info16Regular as InfoIcon,
  ErrorCircle16Filled as ErrorIcon,
  CheckmarkCircle16Filled as OKIcon,
} from '@vicons/fluent'
import { LoadingOutlined as LoadingIcon } from '@vicons/antd'
import { useRoute, useRouter } from 'vue-router'
import { analytics } from '~/plugins/firebase/analytics'
type State = 'ready' | 'working' | 'done'
defineEmits<{
  (e: 'change', state: State): void
}>()

const checker = ref<HTMLElement>()
function toViewport() {
  if (checker.value) {
    window.scrollTo({
      top: checker.value.getBoundingClientRect().top - 20 + window.pageYOffset,
      behavior: 'smooth',
    })
  }
}

const router = useRouter()
const route = useRoute()

const url = ref(decodeURIComponent(String(route.query?.url || '')))
const urlFetching = ref(false)
const uncoveredUrl = ref('')
const error = ref<string | null>(null)

const ssl = ref<any>(null)
const sslFetching = ref(false)
const sslError = ref<string | null>('')

async function executeCheck() {
  toViewport()
  reset()
  analytics.logEvent('use_feature', { featureName: 'uncover_url' })
  try {
    const urlObject = new URL(url.value)
    if (urlObject.hostname !== 'tinyurl.com') {
      throw new Error('not-tinyurl')
    }
    urlFetching.value = true
    const headers = await check({ type: 'url', url: url.value }).catch((e) => {
      error.value = 'Something went wrong. Please try again.'
    })
    urlFetching.value = false
    router.replace({ query: { url: encodeURIComponent(url.value) } })
    if (headers) {
      if (headers.data.location) {
        uncoveredUrl.value = headers.data.location
        sslFetching.value = true
        try {
          const targetUrl = new URL(headers.data.location)
          if (targetUrl.protocol !== 'https:') {
            error.value =
              'The destination website does not use secure connection!'
          } else {
            const certificate = await check({
              type: 'ssl',
              hostname: targetUrl.hostname,
            }).catch((e) => {
              sslError.value =
                'Failed to verify SSL certificate. Proceed on your own risk!'
            })
            sslFetching.value = false
            if (certificate) {
              if (certificate.data.authorized) {
                ssl.value = certificate.data.details
              } else {
                sslError.value =
                  'Failed to verify SSL certificate. Proceed on your own risk!'
              }
            } else {
              sslError.value =
                'Failed to verify SSL certificate. Proceed on your own risk!'
            }
          }
        } catch (e) {
          if (e instanceof Error) {
            error.value = 'Warning! This leads to some shit.'
          }
        } finally {
          sslFetching.value = false
        }
      } else {
        error.value = 'Redirect URL not found'
      }
    }
  } catch (e) {
    if (e instanceof Error && e.message && e.message == 'not-tinyurl') {
      error.value = 'This is not a TinyURL.'
    } else {
      error.value =
        'Provided URL is invalid. The URL must be in the following format: https://tinyurl.com/{code}'
    }
  }
}

function reset(alsoUrl = false) {
  if (alsoUrl) {
    url.value = ''
  }
  urlFetching.value = false
  uncoveredUrl.value = ''
  error.value = ''
  ssl.value = ''
  sslFetching.value = false
  sslError.value = ''
}
</script>

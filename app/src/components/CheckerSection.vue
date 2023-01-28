<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
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
      <div class="mx-auto w-full max-w-xl py-20">
        <form class="mt-5 sm:flex sm:items-center">
          <div class="w-full sm:max-w-xs">
            <label for="url" class="sr-only">TinyURL</label>
            <div class="mt-1">
              <input
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
            class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto"
          >
            Check URL for free
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type State = 'ready' | 'working' | 'done'
defineEmits<{
  (e: 'change', state: State): void
}>()
</script>

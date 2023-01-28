<template>
  <footer class="bg-white" aria-labelledby="footer-heading">
    <div class="mx-auto max-w-7xl space-y-8 px-6 pb-8 pt-16">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8"></div>
      </div>
      <div class="mt-8 space-y-4 border-t border-gray-900/10 pt-8">
        <p class="text-sm leading-6 text-gray-600">
          Making the world a better place through constructing small helper
          tools.
        </p>
        <div class="flex w-full items-center justify-start space-x-4">
          <a
            href="#"
            class="flex items-center space-x-2 text-sm text-emerald-600"
          >
            <LogoIcon class="h-6" />
            <h1 class="font-medium">TinyURL Checker</h1>
          </a>
          <p class="text-xs leading-5 text-gray-500">
            &copy; 2023 Made for people.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ShieldCheckmarkOutline as LogoIcon } from '@vicons/ionicons5'
</script>

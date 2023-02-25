<template>
  <main>
    <div class="mt-16 sm:px-8 lg:mt-32">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <div class="xl:relative">
              <div class="mx-auto max-w-2xl">
                <div v-if="route.name == 'blog'">List of articles</div>
                <RouterView v-else />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
window.scrollTo({ top: 0 })
</script>

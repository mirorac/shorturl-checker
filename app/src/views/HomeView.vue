<template>
  <main>
    <CheckerSection />
    <FeaturesSection id="features" />
    <BlogSection id="blog" />
    <FaqSection id="faq" />
  </main>
</template>

<script setup lang="ts">
import BlogSection from '~/components/BlogSection.vue'
import CheckerSection from '~/components/CheckerSection.vue'
import FaqSection from '~/components/FaqSection.vue'
import FeaturesSection from '~/components/FeaturesSection.vue'
</script>

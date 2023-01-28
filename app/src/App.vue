<template>
  <HeaderPanel />
  <RouterView />
  <FooterSection />
</template>

<script setup lang="ts">
import HeaderPanel from '~/components/HeaderPanel.vue'
import FooterSection from '~/components/FooterSection.vue'
import { RouterView } from 'vue-router'
</script>

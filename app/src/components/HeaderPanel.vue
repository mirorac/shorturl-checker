<template>
  <Popover class="sticky top-0 z-10 bg-white">
    <div class="mx-auto max-w-7xl px-6">
      <div
        class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="/" class="flex items-center space-x-2 text-emerald-600">
            <LogoIcon class="h-10" />
            <h1 class="font-medium">TinyURL Checker</h1>
          </a>
        </div>
        <div class="-my-2 -mr-2 md:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
          <a
            href="/#faq"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
            >FAQ</a
          >
          <a
            href="/#features"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
            >Features</a
          >
        </PopoverGroup>
        <div
          class="hidden items-center justify-end md:flex md:flex-1 lg:w-0"
          :class="{ invisible: y < 400 }"
        >
          <a
            href="/"
            @click.prevent="toViewport"
            class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            Check URL now
          </a>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
      >
        <div
          class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
                  alt="Your Company"
                />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="space-y-6 py-6 px-5">
            <PopoverButton as="div" class="grid grid-cols-1 gap-y-4 gap-x-8">
              <a
                href="#faq"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                >FAQ</a
              >

              <a
                href="#features"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                >Features</a
              >
            </PopoverButton>
            <div>
              <p class="mt-6 text-center text-base font-medium text-gray-500">
                Want stay safe?
                {{ ' ' }}
                <PopoverButton
                  as="a"
                  href="/#"
                  @click.prevent="toViewport"
                  class="text-emerald-600 hover:text-emerald-500"
                >
                  Check URL now
                </PopoverButton>
              </p>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import {
  Menu as Bars3Icon,
  Close as XMarkIcon,
  ShieldCheckmarkOutline as LogoIcon,
} from '@vicons/ionicons5'
import { useScroll } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

function toViewport() {
  const checker = document.querySelector('#checker')
  if (checker) {
    window.scrollTo({
      top: checker.getBoundingClientRect().top - 20 + window.pageYOffset,
      behavior: 'smooth',
    })
  } else {
    router.push({ name: 'home' })
  }
}

const { y } = useScroll(window)
</script>

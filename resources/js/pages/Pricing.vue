<script setup lang="ts">
import { ref } from 'vue';

const pricingPackages = [
  {
    title: 'Basic Plan',
    details: 'Essential features for small businesses. $199/month.',
  },
  {
    title: 'Standard Plan',
    details: 'Most popular option with added scalability. $399/month.',
  },
  {
    title: 'Premium Plan',
    details: 'Advanced features and dedicated support. $699/month.',
  },
  {
    title: 'Enterprise Plan',
    details: 'Custom solutions for large enterprises. Contact us for pricing.',
  },
];

const activeIndex = ref<number | null>(null);

function toggleDetails(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<template>
  <h2 class="text-4xl font-bold mb-6 text-center text-white tracking-wide">Pricing</h2>
  <div class="grid grid-cols-2 xl:grid-cols-4 gap-6 text-gray-700 px-20">
    <div
      v-for="(plan, index) in pricingPackages"
      :key="index"
      class="cursor-pointer"
      @click="toggleDetails(index)"
    >
      <div
        class="p-6 min-h-fit h-full xl:h-[50vh] rounded-lg shadow-xl font-bold transition-all duration-300 ease-in-out hover:scale-105 text-5xl"
        :class="{
          'bg-blue-500 scale-105 text-white shadow-xl': activeIndex === index,
          'bg-gray-100': activeIndex !== index
        }"
      >
        {{ plan.title }}
        
        <div
            class="mt-4 p-4 rounded text-xl"
        >
        {{ plan.details }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

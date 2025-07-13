<script setup lang="ts">
import { ref } from 'vue';

const pricingPackages = [
  {
    title: 'Web Development',
    details: 'Professional website development tailored to your business needs',
    price: 'Start from Rp5.000.000',
    id: 'Pengembangan website profesional sesuai kebutuhan bisnis Anda.'
  },
  {
    title: 'Mobile App Development',
    details: 'Custom Android and iOS applications.',
    price: 'Start from Rp12.000.000',
    id: 'Pengembangan aplikasi Android dan iOS kustom.'
  },
  {
    title: 'System Maintenance',
    details: 'Ongoing support and maintenance for existing systems.',
    price: 'Start from Rp500.000',
    id: 'Dukungan dan pemeliharaan berkelanjutan untuk sistem yang sudah ada.'
  },
  {
    title: 'Landing Page Website',
    details: 'Outstanding landing page to make your business more outstanding.',
    price: 'Start from Rp300.000',
    id: 'Halaman landing yang menarik untuk membuat bisnis Anda lebih menonjol.'
  },
];



const activeIndex = ref<number | null>(null);

function toggleDetails(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<template>
  <h2 class="text-4xl font-bold mb-6 text-center text-white tracking-wide pt-24">Pricing</h2>
  <div class="grid grid-cols-2 xl:grid-cols-4 gap-6 text-gray-700 px-20">
    <div
      v-for="(plan, index) in pricingPackages"
      :key="index"
      class="cursor-pointer"
      @click="toggleDetails(index)"
    >
      <div
        class="p-6 min-h-fit h-full xl:h-[50vh] rounded-lg shadow-xl font-bold transition-all duration-300 ease-in-out hover:scale-105 text-4xl"
        :class="{
          'bg-blue-500 scale-105 text-white shadow-xl': activeIndex === index,
          'bg-gray-100': activeIndex !== index
        }"
      >
        <div :class="[
          'font-bold',
          activeIndex != index ? '' : 'text-white bg-none'
        ]">
          {{ plan.title }}
        </div>
        <div :class="[
          activeIndex != index 
              ? 'bg-gradient-to-b from-blue-700 via-blue-400 to-blue-600 bg-clip-text text-transparent' 
              : 'bg-gradient-to-b from-blue-200 via-white to-blue-200 bg-clip-text text-transparent'
        ]" class="text-xl">
          {{ plan.price }}
        </div>
        
        <div
            class="mt-8 px-2 font-semibold rounded text-xl"
        >
        {{ plan.details }}
        </div>
        <div
            class="px-2 mt-2 rounded font-light text-[12px]"
        >
        {{ plan.id }}
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

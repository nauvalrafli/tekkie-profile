<script setup lang="ts">
import { ref } from 'vue';

const pricingPackages = [
  {
    title: 'Web Development',
    details: 'Professional website development tailored to your business needs. Starting from Rp 5.000.000.',
    id: 'Profesional pengembangan website sesuai kebutuhan bisnis. Mulai dari Rp 5.000.000.',
  },
  {
    title: 'Mobile App Development',
    details: 'Custom Android and iOS applications. Starting from Rp 12.000.000.',
    id: 'Pengembangan aplikasi Android dan iOS kustom. Mulai dari Rp 12.000.000.',
  },
  {
    title: 'System Maintenance',
    details: 'Ongoing support and maintenance for existing systems. Starting from Rp 1.000.000/month.',
    id: 'Dukungan dan pemeliharaan sistem yang sudah ada. Mulai dari Rp 1.000.000/bulan.',
  },
  {
    title: 'Enterprise Solutions',
    details: 'End-to-end solutions for large-scale systems. Contact us for custom pricing.',
    id: 'Solusi menyeluruh untuk sistem berskala besar. Hubungi kami untuk harga khusus.',
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
          activeIndex != index ? 'text-blue-700' : 'text-white'
        ]">
          {{ plan.title }}
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

<script setup lang="ts">
import { ref } from 'vue';

const services = [
  {
    title: 'Custom Web Development',
    details: 'We build responsive websites tailored to your business needs.',
    id: 'Kami membangun situs web responsif yang disesuaikan dengan kebutuhan bisnis Anda.'
  },
  {
    title: 'Mobile App Development',
    details: 'Cross-platform mobile apps built with performance and usability in mind.',
    id: 'Aplikasi mobile lintas platform yang dibangun dengan performa dan kemudahan penggunaan sebagai prioritas.'
  },
  {
    title: 'UI/UX Design',
    details: 'User-centered designs to create engaging digital experiences.',
    id: 'Desain berpusat pada pengguna untuk menciptakan pengalaman digital yang menarik.'
  },
  {
    title: 'IT Consultation',
    details: 'Consult your technology implementation worry-free',
    id: 'Konsultasikan penerapan teknologi Anda tanpa khawatir.'
  },
];


const activeIndex = ref<number | null>(null);

function toggleDetails(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<template>
    <div class="w-full flex flex-col justify-center h-[60vh]">
      <h2 class="text-4xl font-bold mb-6 text-center text-white tracking-wide">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 px-20">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="cursor-pointer"
          @click="toggleDetails(index)"
        >
          <div
            class="p-6 rounded-lg shadow-xl font-bold transition-all duration-300 ease-in-out hover:scale-105;"
            :class="{
              'bg-blue-500 scale-105 text-white shadow-xl': activeIndex === index,
              'bg-gray-100': activeIndex !== index
            }"
          >
            <div class="text-xl" :class="[
              activeIndex == index ? 'text-white' : 'text-blue-800'
            ]">
              {{ service.title }}
            </div>
            <transition name="fade">
            <div>
              <div
              v-if="activeIndex === index"
              class="mt-4 rounded"
            >
              {{ service.details }}
            </div>
            <div
              v-if="activeIndex === index"
              class="rounded text-xs text-blue-200"
            >
              {{ service.id }}
            </div>
            </div>
          </transition>
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
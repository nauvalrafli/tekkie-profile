<script setup lang="ts">
import { ref } from 'vue';

const services = [
  {
    title: 'Custom Web Development',
    details: 'We build responsive websites tailored to your business needs.',
  },
  {
    title: 'Mobile App Development',
    details: 'Cross-platform mobile apps built with performance and usability in mind.',
  },
  {
    title: 'UI/UX Design',
    details: 'User-centered designs to create engaging digital experiences.',
  },
  {
    title: 'Cloud-Based Solutions',
    details: 'Scalable and secure cloud services for your growing business.',
  },
];

const activeIndex = ref(null);

function toggleDetails(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<template>
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
          {{ service.title }}
          <transition name="fade">
          <div
            v-if="activeIndex === index"
            class="mt-4 p-4 rounded"
          >
            {{ service.details }}
          </div>
        </transition>
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
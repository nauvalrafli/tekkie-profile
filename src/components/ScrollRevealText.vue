<template>
    <div class="relative overflow-hidden">
      <!-- Black base text -->
      <h1 class="text-7xl font-bold text-black relative z-10">
        {{ text }}
      </h1>
  
      <!-- Gradient overlay text -->
      <h1
        ref="overlay"
        class="text-7xl font-bold text-transparent bg-clip-text absolute top-0 left-0 w-full z-20 pointer-events-none reveal-overlay"
      >
        {{ text }}
      </h1>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  
  const props = defineProps<{
    text: string
    baseColor: string
    gradientColor: string
  }>()
  
  const overlay = ref<HTMLElement | null>(null)
  
  const updateScrollMask = () => {
    if (!overlay.value) return
    const rect = overlay.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const visible = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1)
    overlay.value.style.maskSize = `100% ${visible * 100}%`
    overlay.value.style.webkitMaskSize = `100% ${visible * 100}%`
  }
  
  const updateGradient = () => {
    if (!overlay.value) return
    overlay.value.style.backgroundImage = `linear-gradient(to right, ${props.baseColor}, ${props.gradientColor})`
  }
  
  onMounted(() => {
    updateGradient()
    updateScrollMask()
    window.addEventListener('scroll', updateScrollMask)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollMask)
  })
  
  watch([() => props.baseColor, () => props.gradientColor], updateGradient)
  </script>
  
  <style scoped>
  .reveal-overlay {
    background-size: 100% 100%;
    background-repeat: no-repeat;
  
    -webkit-mask-image: linear-gradient(to top, black 0%, transparent 100%);
    -webkit-mask-size: 100% 0%;
    -webkit-mask-repeat: no-repeat;
  
    mask-image: linear-gradient(to top, black 0%, transparent 100%);
    mask-size: 100% 0%;
    mask-repeat: no-repeat;
  
    transition: mask-size 0.1s ease-out;
  }
  </style>
  
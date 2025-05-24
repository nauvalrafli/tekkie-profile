<template>
    <div class="font-sans view text-gray-800">
      <!-- Header Navigation -->
      <header :class="[isTop ? 'bg-transparent text-white' : 'bg-white']" class="shadow-xl fixed top-0 left-0 w-full z-10 transition-all duration-500">
        <nav class="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
          <div class="transition-all ease-in-out duration-300 flex justify-center items-center">
            <h1 v-if="isTop" class="text-xl font-bold">Tekkie</h1>
            <img v-else class="w-fit h-10" :src="Assets.app_logo" />
          </div>
          <ul class="flex gap-6 text-md font-semibold">
            <!-- <li><a href="#home" :class="[isTop ? 'hover:text-blue-200' : 'hover:text-blue-600']">Home</a></li> -->
            <li><div @click="scrollTo('home')" :class="[isTop ? 'hover:text-blue-200' : 'hover:text-blue-600']">Home</div></li>
            <li><div @click="scrollTo('services')" :class="[isTop ? 'hover:text-blue-200' : 'hover:text-blue-600']">Services</div></li>
            <li><div @click="scrollTo('pricing')" :class="[isTop ? 'hover:text-blue-200' : 'hover:text-blue-600']">Pricing</div></li>
            <li><div @click="scrollTo('contact')" :class="[isTop ? 'hover:text-blue-200' : 'hover:text-blue-600']">Contact Us</div></li>
          </ul>
        </nav>
      </header>
  
      <!-- Page Content -->
      <main class="mx-auto scroll-smooth">
        <!-- Home Section -->
        <section id="home" class="min-h-[60vh] bg-gradient-to-tl from-[#007BFF] via-[#007BFF] to-[#655252] pt-24 py-24  flex flex-col justify-center items-center text-center space-y-10 relative">
          <div class="flex items-center px-auto">
            <div class="flex-col justify-center items-center">
              <img class="max-w-xl" :src="Assets.app_logo_white" />
              <!-- <h1 class="text-[160px] font-bold tracking-[1rem] bg-linear-to-b from-white via-50% to-white bg-clip-text text-transparent">Tekkie</h1> -->
              <div class="text-[24px] max-w-xl flex text-white items-center px-16 mt-8">
                <img :src="Assets.ic_right" class="w-[48px] h-[48px]" style="color" />
                <div>Grow Your Business With Technology</div>
              </div>
              <div class="flex items-center justify-between mt-16">
                <a class="ml-10 bg-blue-400 rounded-full py-2 px-6 text-white cursor-pointer" @click="scrollToServices">Explore now</a>
                <div class="bg-white rounded-full w-10 py-2 text-black ml-3 mr-auto items-center"><-</div>
                <!-- <div class="bg-blue-400 rounded-3xl py-4 px-6 text-white text-2xl">Smart<br>Innovation</div> -->
              </div>
            </div>
            <div>
              <img class="rotate-10 h-[50vh] ml-24" :src="Assets.mascot" />
            </div>
          </div>
        </section>
  
        <!-- Services Section -->
        <section id="services" class="min-h-[60vh] py-24 bg-[#007BFF]">
          <Services/>
        </section>

        <section id="pricing" class="bg-gradient-to-b from-[#007BFF] to-white">
          <Pricing />
        </section>
  
        <!-- Contact Section -->
        <section id="contact" class="min-h-[60vh] text-center py-24">
          <ContactUs />
        </section>
      </main>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {Assets} from "../assets/assets"
import ScrollRevealText from "../components/ScrollRevealText.vue"
import ContactUs from "./ContactUs.vue"
import Services from "./Services.vue"
import Pricing from "./Pricing.vue"
// No logic needed for static scroll navigation

const isTop = ref(true)

const onScroll = () => {
  console.log("Called " + window.scrollY + isTop.value)
  isTop.value = window.scrollY < 50
}

const scrollToServices = () => {
  const target = document.getElementById('services');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollTo = (id: string) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>
  
<style scoped>
html {
  scroll-behavior: smooth;
}

section {
  min-height: 100vh;
  align-items: center;
}

view {
  overflow: hidden;
  overscroll-behavior: none;
}

div {
  user-select: none;
}
</style>
  
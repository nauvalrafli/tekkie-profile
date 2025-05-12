<script setup lang="ts">
import {Assets} from "../assets/assets.ts"
</script>

<template>
    <div class="mx-[10%] space-y-8">
        <h2 class="text-4xl font-bold text-gray-800">Contact Us</h2>
        <div class="w-full bg-white shadow-2xl rounded-2xl grid grid-cols-3">
            <div class="w-full p-6 space-y-4 text-left">
            <h3 class="text-xl font-semibold text-gray-800">Get in Touch</h3>
            <a href="https://instagram.com/yourcompany" class="flex items-center space-x-3 p-1 rounded-2xl transition-all scale-102 duration-300 ease-in-out hover:bg-pink-500">
                <div class="rounded-full bg-white">
                <img :src="Assets.instagram" class="contact-icon p-2" />
                </div>
                <div target="_blank" class="text-gray-700 hover:underline">
                @yourcompany
                </div>
            </a>
            <a href="https://wa.me/6281234567890" class="flex items-center space-x-3 p-1 rounded-2xl transition-all scale-102 duration-300 ease-in-out hover:bg-green-400">
                <div class="rounded-full bg-white">
                <img :src="Assets.whatsapp" class="contact-icon p-2" />
                </div>
                <div target="_blank" class="text-gray-700 hover:underline">
                +62 812-3456-7890
                </div>
            </a>
            <a href="mailto:nauvalrafli@gmail.com" class="flex items-center space-x-3 p-1 rounded-2xl transition-all scale-102 duration-300 ease-in-out hover:bg-blue-300">
                <div class="rounded-full bg-white">
                <img :src="Assets.mail" class="contact-icon p-2" />
                </div>
                <div target="_blank" class="text-gray-700 hover:underline">
                nauvalrafli@gmail.com
                </div>
            </a>
            </div>

            <form @submit.prevent="sendEmail" class="space-y-4 text-left w-full col-span-2 items-end bg-blue-100 p-6 shadow-lg rounded-2xl">
            <div>
                <label class="block text-sm font-medium mb-1">Name</label>
                <input v-model="name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input v-model="email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Phone</label>
                <input v-model="phone" type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Message</label>
                <textarea v-model="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
            </div>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition float-end">
                Send Message
            </button>
            </form>
        </div>
    </div>
</template>

<style scoped>

textarea, input {
  background-color: white;
}

.contact-icon {
  width: 40px;
}
</style>
<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

interface Props {
    to?: RouteLocationRaw;
    href?: string;
    tabindex?: number;
    external?: boolean;
}

defineProps<Props>();
</script>

<template>
    <!-- External link -->
    <a
        v-if="external || href"
        :href="href"
        :tabindex="tabindex"
        target="_blank"
        rel="noopener noreferrer"
        class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
    >
        <slot />
    </a>
    
    <!-- Internal router link -->
    <router-link
        v-else
        :to="to!"
        :tabindex="tabindex"
        class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
    >
        <slot />
    </router-link>
</template>

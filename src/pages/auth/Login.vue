<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBase from '@/layouts/AuthLayout.vue';
import { useAuthStore } from '@/store/auth';
import { LoaderCircle } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = ref({
    email: '',
    password: '',
    remember: false,
});

const errors = ref<Record<string, string>>({});
const status = ref('');

const submit = async () => {
    errors.value = {};
    
    const result = await authStore.login(
        form.value.email,
        form.value.password,
        form.value.remember
    );
    
    if (result.success) {
        // Redirect to intended page or dashboard
        const redirectTo = route.query.redirect as string || '/dashboard';
        router.push(redirectTo);
    } else {
        if (result.errors) {
            errors.value = Object.fromEntries(
                Object.entries(result.errors).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
            );
        }
        if (result.message) {
            status.value = result.message;
        }
        // Reset password field
        form.value.password = '';
    }
};
</script>

<template>
    <AuthBase title="Log in to your account" description="Enter your email and password below to log in">
        <div v-if="status" class="mb-4 text-center text-sm font-medium text-red-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="email"
                        v-model="form.email"
                        placeholder="email@example.com"
                    />
                    <InputError :message="errors.email" />
                </div>

                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Password</Label>
                        <router-link 
                            :to="{ name: 'password.request' }" 
                            class="text-sm text-primary hover:underline"
                            :tabindex="5"
                        >
                            Forgot password?
                        </router-link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        :tabindex="2"
                        autocomplete="current-password"
                        v-model="form.password"
                        placeholder="Password"
                    />
                    <InputError :message="errors.password" />
                </div>

                <div class="flex items-center justify-between">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox id="remember" v-model="form.remember" :tabindex="3" />
                        <span>Remember me</span>
                    </Label>
                </div>

                <Button type="submit" class="mt-4 w-full" :tabindex="4" :disabled="authStore.loading">
                    <LoaderCircle v-if="authStore.loading" class="h-4 w-4 animate-spin" />
                    Log in
                </Button>
            </div>

            <div class="text-center text-sm text-muted-foreground">
                Don't have an account?
                <router-link 
                    :to="{ name: 'register' }" 
                    class="text-primary hover:underline"
                    :tabindex="5"
                >
                    Sign up
                </router-link>
            </div>
        </form>
    </AuthBase>
</template>

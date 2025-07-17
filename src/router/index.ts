import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

// Import pages
import Welcome from '@/pages/Welcome.vue';
import Dashboard from '@/pages/Dashboard.vue';
import CompanyProfile from '@/pages/CompanyProfile.vue';
import Services from '@/pages/Services.vue';
import Pricing from '@/pages/Pricing.vue';
import ContactUs from '@/pages/ContactUs.vue';

// Auth pages
import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';
import ForgotPassword from '@/pages/auth/ForgotPassword.vue';
import ResetPassword from '@/pages/auth/ResetPassword.vue';
import VerifyEmail from '@/pages/auth/VerifyEmail.vue';
import ConfirmPassword from '@/pages/auth/ConfirmPassword.vue';

// Settings pages
import SettingsLayout from '@/layouts/settings/Layout.vue';
import ProfileSettings from '@/pages/settings/Profile.vue';
import PasswordSettings from '@/pages/settings/Password.vue';
import AppearanceSettings from '@/pages/settings/Appearance.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Welcome,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { guest: true },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { guest: true },
    },
    {
        path: '/forgot-password',
        name: 'password.request',
        component: ForgotPassword,
        meta: { guest: true },
    },
    {
        path: '/reset-password/:token',
        name: 'password.reset',
        component: ResetPassword,
        meta: { guest: true },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { auth: true },
    },
    {
        path: '/profile',
        name: 'company.profile',
        component: CompanyProfile,
    },
    {
        path: '/services',
        name: 'services',
        component: Services,
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: Pricing,
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactUs,
    },
    {
        path: '/verify-email',
        name: 'verification.notice',
        component: VerifyEmail,
        meta: { auth: true },
    },
    {
        path: '/confirm-password',
        name: 'password.confirm',
        component: ConfirmPassword,
        meta: { auth: true },
    },
    {
        path: '/settings',
        component: SettingsLayout,
        meta: { auth: true },
        children: [
            {
                path: 'profile',
                name: 'settings.profile',
                component: ProfileSettings,
            },
            {
                path: 'password',
                name: 'settings.password',
                component: PasswordSettings,
            },
            {
                path: 'appearance',
                name: 'settings.appearance',
                component: AppearanceSettings,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    // Check if route requires authentication
    if (to.meta.auth && !authStore.isAuthenticated) {
        return next({ name: 'login', query: { redirect: to.fullPath } });
    }
    
    // Check if route is for guests only
    if (to.meta.guest && authStore.isAuthenticated) {
        return next({ name: 'dashboard' });
    }
    
    next();
});

export default router;

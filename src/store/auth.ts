import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiClient } from '@/api/client';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('token'));
    const loading = ref(false);

    const isAuthenticated = computed(() => !!token.value && !!user.value);

    // Set authentication data
    function setAuth(userData: User, authToken: string) {
        user.value = userData;
        token.value = authToken;
        localStorage.setItem('token', authToken);
        
        // Set default authorization header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }

    // Clear authentication data
    function clearAuth() {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
        delete apiClient.defaults.headers.common['Authorization'];
    }

    // Login
    async function login(email: string, password: string, remember = false) {
        loading.value = true;
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password,
                remember,
            });
            
            const { user: userData, token: authToken } = response.data;
            setAuth(userData, authToken);
            
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
                errors: error.response?.data?.errors || {},
            };
        } finally {
            loading.value = false;
        }
    }

    // Register
    async function register(name: string, email: string, password: string, passwordConfirmation: string) {
        loading.value = true;
        try {
            const response = await apiClient.post('/auth/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            
            const { user: userData, token: authToken } = response.data;
            setAuth(userData, authToken);
            
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
                errors: error.response?.data?.errors || {},
            };
        } finally {
            loading.value = false;
        }
    }

    // Logout
    async function logout() {
        loading.value = true;
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            // Continue with logout even if API call fails
            console.error('Logout API call failed:', error);
        } finally {
            clearAuth();
            loading.value = false;
        }
    }

    // Get current user
    async function fetchUser() {
        if (!token.value) return;
        
        loading.value = true;
        try {
            const response = await apiClient.get('/user');
            user.value = response.data;
        } catch (error) {
            // Token might be invalid, clear auth
            clearAuth();
        } finally {
            loading.value = false;
        }
    }

    // Forgot password
    async function forgotPassword(email: string) {
        loading.value = true;
        try {
            await apiClient.post('/auth/forgot-password', { email });
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to send reset email',
                errors: error.response?.data?.errors || {},
            };
        } finally {
            loading.value = false;
        }
    }

    // Reset password
    async function resetPassword(token: string, email: string, password: string, passwordConfirmation: string) {
        loading.value = true;
        try {
            const response = await apiClient.post('/auth/reset-password', {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            
            const { user: userData, token: authToken } = response.data;
            setAuth(userData, authToken);
            
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Password reset failed',
                errors: error.response?.data?.errors || {},
            };
        } finally {
            loading.value = false;
        }
    }

    // Initialize auth on app start
    function initializeAuth() {
        if (token.value) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            fetchUser();
        }
    }

    return {
        user,
        token,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        fetchUser,
        forgotPassword,
        resetPassword,
        initializeAuth,
        setAuth,
        clearAuth,
    };
});

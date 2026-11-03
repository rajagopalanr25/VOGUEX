import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { loginApi, registerApi, getProfileApi } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  loadUserProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (credentials) => {
        const data = await loginApi(credentials);
        if (data.token) {
          localStorage.setItem('voguex_token', data.token);
        }
        set({
          user: data,
          token: data.token || null,
          isAuthenticated: true,
          isAdmin: data.role === 'admin'
        });
      },

      register: async (userData) => {
        const data = await registerApi(userData);
        if (data.token) {
          localStorage.setItem('voguex_token', data.token);
        }
        set({
          user: data,
          token: data.token || null,
          isAuthenticated: true,
          isAdmin: data.role === 'admin'
        });
      },

      logout: () => {
        localStorage.removeItem('voguex_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false
        });
      },

      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
          isAdmin: updatedUser.role ? updatedUser.role === 'admin' : state.isAdmin
        }));
      },

      loadUserProfile: async () => {
        const token = localStorage.getItem('voguex_token');
        if (!token) return;
        try {
          const profile = await getProfileApi();
          set({
            user: profile,
            isAuthenticated: true,
            isAdmin: profile.role === 'admin'
          });
        } catch {
          get().logout();
        }
      }
    }),
    {
      name: 'voguex_auth_storage'
    }
  )
);


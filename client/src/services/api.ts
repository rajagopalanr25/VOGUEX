import axios from 'axios';
import { Product, Order, Coupon, Review, User } from '../types';

const API = axios.create({
  baseURL: '/api'
});

// Attach JWT token to requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('voguex_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const fetchProducts = async (params: any = {}) => {
  const { data } = await API.get<{ products: Product[]; total: number; page: number; pages: number }>('/products', { params });
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await API.get<Product>(`/products/${id}`);
  return data;
};

export const fetchHomeCollections = async () => {
  const { data } = await API.get<{
    newArrivals: Product[];
    bestSellers: Product[];
    trending: Product[];
    limitedEdition: Product[];
  }>('/products/collections/home');
  return data;
};

export const searchAutocompleteApi = async (query: string) => {
  const { data } = await API.get<any[]>(`/products/search/autocomplete`, { params: { q: query } });
  return data;
};

// Auth
export const loginApi = async (credentials: { email: string; password: string }) => {
  const { data } = await API.post<User>('/auth/login', credentials);
  return data;
};

export const registerApi = async (userData: { name: string; email: string; password: string }) => {
  const { data } = await API.post<User>('/auth/register', userData);
  return data;
};

export const getProfileApi = async () => {
  const { data } = await API.get<User>('/auth/profile');
  return data;
};

export const updateProfileApi = async (userData: any) => {
  const { data } = await API.put<User>('/auth/profile', userData);
  return data;
};

// Orders
export const createOrderApi = async (orderData: any) => {
  const { data } = await API.post<Order>('/orders', orderData);
  return data;
};

export const fetchMyOrdersApi = async () => {
  const { data } = await API.get<Order[]>('/orders/myorders');
  return data;
};

export const fetchOrderByIdApi = async (id: string) => {
  const { data } = await API.get<Order>(`/orders/${id}`);
  return data;
};

export const trackOrderApi = async (query: string) => {
  const { data } = await API.get<Order>(`/orders/track/${query}`);
  return data;
};

export const cancelOrderApi = async (id: string) => {
  const { data } = await API.put(`/orders/${id}/cancel`);
  return data;
};

// Payments
export const createPaymentOrderApi = async (orderId: string) => {
  const { data } = await API.post('/payments/create-order', { orderId });
  return data;
};

export const verifyPaymentApi = async (paymentData: any) => {
  const { data } = await API.post('/payments/verify', paymentData);
  return data;
};

// Coupons
export const validateCouponApi = async (code: string, cartTotal: number) => {
  const { data } = await API.post('/coupons/validate', { code, cartTotal });
  return data;
};

export const fetchCouponsApi = async () => {
  const { data } = await API.get<Coupon[]>('/coupons');
  return data;
};

// Reviews
export const fetchProductReviewsApi = async (productId: string) => {
  const { data } = await API.get<{ reviews: Review[]; count: number; averageRating: number }>(`/reviews/${productId}`);
  return data;
};

export const submitProductReviewApi = async (productId: string, reviewData: any) => {
  const { data } = await API.post<Review>(`/reviews/${productId}`, reviewData);
  return data;
};

// Admin
export const adminGetDashboardApi = async () => {
  const { data } = await API.get('/admin/dashboard');
  return data;
};

export const adminGetOrdersApi = async (params: any = {}) => {
  const { data } = await API.get<Order[]>('/admin/orders', { params });
  return data;
};

export const adminUpdateOrderStatusApi = async (orderId: string, status: string, notes?: string) => {
  const { data } = await API.put(`/admin/orders/${orderId}/status`, { status, notes });
  return data;
};

export const adminCreateProductApi = async (productData: any) => {
  const { data } = await API.post<Product>('/products', productData);
  return data;
};

export const adminDeleteProductApi = async (id: string) => {
  const { data } = await API.delete(`/products/${id}`);
  return data;
};

export const adminGetCustomersApi = async () => {
  const { data } = await API.get('/admin/customers');
  return data;
};

export default API;


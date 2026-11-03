import { mockProducts, mockCoupons, mockUsers, mockOrders, mockReviews } from './mockData.js';
import bcrypt from 'bcryptjs';

// In-memory data store with state preservation
class DataStore {
  constructor() {
    this.products = [...mockProducts];
    this.coupons = [...mockCoupons];
    this.users = [...mockUsers];
    this.orders = [...mockOrders];
    this.reviews = [...mockReviews];
    this.cartMap = new Map(); // userId -> items
    this.initDefaultPasswords();
  }

  async initDefaultPasswords() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('admin123', salt);
    this.users.forEach(u => {
      u.passwordHash = hashed;
    });
  }

  // PRODUCTS
  getProducts({ category, gender, subcategory, search, sort, minPrice, maxPrice, page = 1, limit = 12 }) {
    let filtered = [...this.products];

    if (category && category.toLowerCase() !== 'all') {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === category.toLowerCase() ||
        (category.toLowerCase() === 'new arrivals' && p.isNewArrival) ||
        (category.toLowerCase() === 'best sellers' && p.isBestSeller) ||
        (category.toLowerCase() === 'trending' && p.isTrending)
      );
    }

    if (gender && gender.toLowerCase() !== 'all') {
      filtered = filtered.filter(p => p.gender.toLowerCase() === gender.toLowerCase() || p.gender === 'Unisex');
    }

    if (subcategory) {
      filtered = filtered.filter(p => p.subcategory?.toLowerCase() === subcategory.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.colors?.some(c => c.name.toLowerCase().includes(q))
      );
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    // Sort
    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount);
    } else {
      // recommended / newest default
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + Number(limit));

    return {
      products: paginated,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    };
  }

  getProductById(id) {
    return this.products.find(p => p._id === id);
  }

  addProduct(productData) {
    const newProduct = {
      ...productData,
      _id: `prod_${Date.now()}`,
      rating: 5.0,
      numReviews: 0,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id, updateData) {
    const idx = this.products.findIndex(p => p._id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updateData };
    return this.products[idx];
  }

  deleteProduct(id) {
    const idx = this.products.findIndex(p => p._id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }

  // USERS & AUTH
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u._id === id);
  }

  async createUser({ name, email, password, role = 'customer' }) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = {
      _id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role,
      passwordHash,
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      addresses: [],
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  async verifyPassword(user, password) {
    if (!user.passwordHash) return true; // mock fallback
    return await bcrypt.compare(password, user.passwordHash);
  }

  // ORDERS
  getOrders(userId = null) {
    if (userId) {
      return this.orders.filter(o => o.user === userId || o.user?._id === userId);
    }
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find(o => o._id === id || o.orderId === id);
  }

  createOrder(orderData) {
    const newOrder = {
      ...orderData,
      _id: `ord_${Date.now()}`,
      orderId: `VGX-${Math.floor(100000 + Math.random() * 900000)}`,
      status: orderData.status || 'Order Placed',
      trackingNumber: `VGX-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      courierPartner: 'BlueDart Luxury Express',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(),
      trackingHistory: [
        {
          status: 'Order Placed',
          timestamp: new Date().toISOString(),
          location: 'VOGUEX Digital Flagship',
          notes: 'Order received and logged in system.'
        },
        ...(orderData.isPaid ? [{
          status: 'Payment Confirmed',
          timestamp: new Date().toISOString(),
          location: 'Razorpay Gateway',
          notes: 'Payment verified and secured.'
        }] : [])
      ],
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId, status, notes = '') {
    const order = this.orders.find(o => o._id === orderId || o.orderId === orderId);
    if (!order) return null;

    order.status = status;
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date().toISOString();
    }

    order.trackingHistory.push({
      status,
      timestamp: new Date().toISOString(),
      location: 'Regional Luxury Distribution Hub',
      notes: notes || `Order status updated to ${status}`
    });

    return order;
  }

  // COUPONS
  getCoupon(code) {
    return this.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
  }

  // REVIEWS
  getReviews(productId) {
    return this.reviews.filter(r => r.product === productId);
  }

  addReview(reviewData) {
    const newReview = {
      ...reviewData,
      _id: `rev_${Date.now()}`,
      helpfulCount: 0,
      createdAt: new Date().toISOString()
    };
    this.reviews.unshift(newReview);
    return newReview;
  }
}

export const store = new DataStore();


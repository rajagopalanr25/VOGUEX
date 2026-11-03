export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  details?: string[];
  category: string;
  subcategory?: string;
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  rating: number;
  numReviews: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isLimitedEdition?: boolean;
  inStock: boolean;
  stockCount: number;
  model3dType?: 'blazer' | 'dress' | 'sneaker' | 'watch' | 'bag' | 'hoodie' | 'mannequin';
  materials?: string;
  careInstructions?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Address {
  _id?: string;
  fullName?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  type?: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  avatar?: string;
  addresses?: Address[];
  token?: string;
}

export interface TrackingHistoryItem {
  status: string;
  timestamp: string;
  location: string;
  notes: string;
}

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  user?: string;
  guestEmail?: string;
  orderItems: OrderItem[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  discountPrice: number;
  couponApplied?: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  status: 
    | 'Order Placed'
    | 'Payment Confirmed'
    | 'Processing'
    | 'Packed'
    | 'Shipped'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled'
    | 'Return Requested'
    | 'Returned'
    | 'Refund Processing'
    | 'Refunded';
  trackingNumber?: string;
  courierPartner?: string;
  estimatedDelivery?: string;
  trackingHistory: TrackingHistoryItem[];
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountPercentage: number;
  discountAmount: number;
  minOrderValue: number;
  maxDiscount: number;
  isActive: boolean;
}

export interface Review {
  _id: string;
  product: string;
  user: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
  createdAt: string;
}

export interface FilterState {
  category: string;
  gender: string;
  subcategory: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
}


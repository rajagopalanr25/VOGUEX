import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  RefreshCw,
  Box
} from 'lucide-react';
import {
  adminGetDashboardApi,
  adminGetOrdersApi,
  adminUpdateOrderStatusApi,
  adminCreateProductApi,
  adminDeleteProductApi,
  adminGetCustomersApi,
  fetchProducts
} from '../services/api';
import { Order, Product } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin } = useAuthStore();
  const showToast = useUIStore((state) => state.showToast);

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New product form modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Men');
  const [newProductPrice, setNewProductPrice] = useState(350);
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=85');
  const [newProduct3d, setNewProduct3d] = useState('blazer');

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [dash, ords, prods, custs] = await Promise.all([
        adminGetDashboardApi(),
        adminGetOrdersApi(),
        fetchProducts({ limit: 50 }),
        adminGetCustomersApi()
      ]);
      setStats(dash);
      setOrders(ords);
      setProducts(prods.products);
      setCustomers(custs);
    } catch (err) {
      console.error(err);
      showToast('Error syncing administrative data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await adminUpdateOrderStatusApi(orderId, newStatus, `Status updated by Director ${user?.name || 'Admin'}`);
      showToast(`Order status updated to ${newStatus}. Telemetry broadcast live.`, 'success');
      // Refresh orders
      const updatedOrders = await adminGetOrdersApi();
      setOrders(updatedOrders);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to update order status', 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Delete this product from the atelier archives?')) {
      try {
        await adminDeleteProductApi(id);
        setProducts(products.filter((p) => p._id !== id));
        showToast('Product removed from active catalog.', 'info');
      } catch (err: any) {
        showToast(err.response?.data?.message || 'Error deleting product', 'error');
      }
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProd = await adminCreateProductApi({
        name: newProductName,
        brand: 'VOGUEX Atelier',
        category: newProductCategory,
        gender: newProductCategory,
        price: Number(newProductPrice),
        originalPrice: Number(newProductPrice) * 1.25,
        discount: 20,
        description: newProductDesc || 'Mastercrafted in pure Italian mulberry silk and fine wool.',
        images: [newProductImage],
        colors: [
          { name: 'Obsidian Noir', hex: '#111111' },
          { name: 'Champagne Gold', hex: '#C6A76B' }
        ],
        sizes: [
          { size: 'S', stock: 10 },
          { size: 'M', stock: 15 },
          { size: 'L', stock: 8 }
        ],
        stockCount: 33,
        model3dType: newProduct3d,
        isNewArrival: true,
        isFeatured: true
      });
      setProducts([newProd, ...products]);
      setShowAddProductModal(false);
      showToast(`Created new product: ${newProd.name}`, 'success');
      setNewProductName('');
      setNewProductDesc('');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error creating product', 'error');
    }
  };

  const statuses = [
    'Order Placed',
    'Payment Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-neutral-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
            Executive Command Center
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">
            VOGUEX Atelier Administration
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-neutral-100 p-1 rounded-2xl text-xs font-semibold">
          {(['overview', 'orders', 'products', 'customers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#111111] text-[#C6A76B] shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && stats && (
        <div className="space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span className="uppercase tracking-wider font-semibold">Total Revenue</span>
                <DollarSign className="w-4 h-4 text-[#C6A76B]" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-black">
                ${stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">↑ +24% vs previous quarter</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span className="uppercase tracking-wider font-semibold">Total Orders</span>
                <Package className="w-4 h-4 text-[#C6A76B]" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-black">{stats.totalOrders}</p>
              <p className="text-[11px] text-neutral-500 font-medium">{stats.pendingOrders} pending fulfillment</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span className="uppercase tracking-wider font-semibold">Active Clients</span>
                <Users className="w-4 h-4 text-[#C6A76B]" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-black">{stats.totalCustomers}</p>
              <p className="text-[11px] text-emerald-600 font-medium">100% verified VIPs</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span className="uppercase tracking-wider font-semibold">Atelier Catalog</span>
                <Box className="w-4 h-4 text-[#C6A76B]" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-black">{stats.totalProducts}</p>
              <p className="text-[11px] text-neutral-500 font-medium">All with 3D model support</p>
            </div>
          </div>

          {/* Revenue Chart Visual Bar */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Revenue Trajectory (Monthly)</h3>
                <p className="text-xs text-neutral-400">Gross revenue generated across global salons</p>
              </div>
              <span className="text-xs font-bold text-[#C6A76B] bg-neutral-900 px-3 py-1 rounded-full">
                Currency: USD ($)
              </span>
            </div>

            <div className="flex items-end justify-between gap-4 h-48 pt-6 border-b border-neutral-100">
              {stats.monthlySales.map((m: any) => {
                const heightPercent = Math.min(100, Math.round((m.revenue / 50000) * 100));
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${m.revenue}
                    </span>
                    <div
                      className="w-full max-w-[42px] bg-gradient-to-t from-[#111111] to-[#C6A76B] rounded-t-lg transition-all group-hover:brightness-110 shadow-sm"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs font-bold text-neutral-700">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Selling Products & Recent Orders preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-900">Top Selling Haute Creations</h3>
              <div className="space-y-3">
                {stats.topSellingProducts.map((p: any) => (
                  <div key={p._id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-12 object-cover rounded-lg border border-neutral-200" />
                      <div>
                        <p className="font-bold text-neutral-900">{p.name}</p>
                        <p className="text-neutral-400">${p.price} • Stock: {p.stockCount}</p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-800">{p.salesCount} sold</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-900">Recent Commissions</h3>
              <div className="space-y-3">
                {orders.slice(0, 5).map((o) => (
                  <div key={o._id} className="flex items-center justify-between text-xs pb-2 border-b border-neutral-100 last:border-none">
                    <div>
                      <p className="font-bold text-black">{o.orderId}</p>
                      <p className="text-neutral-500">{o.shippingAddress.fullName} • ${o.totalPrice.toFixed(2)}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#111111] text-[#C6A76B]">
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-900">Commission Logistics & Status</h3>
              <p className="text-xs text-neutral-500">Updating status emits real-time events to the customer's live tracking view.</p>
            </div>
            <button
              onClick={loadAllAdminData}
              className="flex items-center gap-1.5 text-xs text-[#C6A76B] hover:text-black font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] text-[#C6A76B] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status Transition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-neutral-50">
                    <td className="py-3.5 px-4 font-bold text-black">{ord.orderId}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-neutral-900">{ord.shippingAddress.fullName}</p>
                      <p className="text-[11px] text-neutral-400">{ord.shippingAddress.city}, {ord.shippingAddress.country}</p>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {ord.orderItems?.length || 1} items
                    </td>
                    <td className="py-3.5 px-4 font-bold text-black">${ord.totalPrice.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ord.isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {ord.isPaid ? 'PAID' : 'PENDING'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                        className="bg-neutral-100 border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-black focus:outline-none focus:border-[#C6A76B]"
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-900">Atelier Catalog Management</h3>
              <p className="text-xs text-neutral-500">Add, edit stock, configure 3D models, and manage inventory.</p>
            </div>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="flex items-center gap-1.5 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Creation</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] text-[#C6A76B] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Piece</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">3D Model</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-neutral-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-lg border border-neutral-200" />
                        <div>
                          <p className="font-bold text-neutral-900">{p.name}</p>
                          <p className="text-[10px] text-[#C6A76B] font-semibold">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{p.category} ({p.gender})</td>
                    <td className="py-3 px-4 font-bold text-black">${p.price}</td>
                    <td className="py-3 px-4">{p.stockCount} in vault</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-amber-50 border border-[#C6A76B]/40 text-[#997b41] text-[10px] font-bold uppercase">
                        {p.model3dType || 'mannequin'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="text-neutral-400 hover:text-red-600 p-1.5"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CUSTOMERS TAB */}
      {activeTab === 'customers' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-neutral-100">
            <h3 className="font-serif text-xl font-bold text-neutral-900">VIP Clientele Directory</h3>
            <p className="text-xs text-neutral-500">Registered atelier members and their acquisition histories.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] text-[#C6A76B] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Orders Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {customers.map((c) => (
                  <tr key={c._id} className="hover:bg-neutral-50">
                    <td className="py-3 px-4 font-bold text-black">{c.name}</td>
                    <td className="py-3 px-4 text-neutral-600">{c.email}</td>
                    <td className="py-3 px-4 text-neutral-500">{c.phone || '+1 555-019-2834'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.role === 'admin' ? 'bg-black text-[#C6A76B]' : 'bg-neutral-100 text-neutral-700'}`}>
                        {c.role === 'admin' ? 'DIRECTOR' : 'VIP CLIENT'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold">{c.orderCount || 1} commissions</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddProductModal(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 z-10 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-neutral-900">Commission New Product to Atelier</h3>
            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Imperial Silk Double-Breasted Trench"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Department</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Price (USD $)</label>
                  <input
                    type="number"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">3D Procedural Mesh Type</label>
                <select
                  value={newProduct3d}
                  onChange={(e) => setNewProduct3d(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2"
                >
                  <option value="blazer">Haute Blazer / Mannequin</option>
                  <option value="dress">Silk Evening Gown</option>
                  <option value="sneaker">Kinetic Sneaker</option>
                  <option value="watch">Skeleton Titanium Watch</option>
                  <option value="bag">Calfskin Handbag</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Editorial Image URL</label>
                <input
                  type="url"
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  placeholder="Composition, drape, and origin notes..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-2.5 rounded-xl uppercase tracking-wider font-semibold"
                >
                  Publish Creation
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

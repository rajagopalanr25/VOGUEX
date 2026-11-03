import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { fetchMyOrdersApi } from '../services/api';
import { Order } from '../types';
import { useAuthStore } from '../store/useAuthStore';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrdersApi();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="pb-6 border-b border-neutral-200">
        <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">Client History</span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">My Orders & Commissions</h1>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div
              key={ord._id}
              className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-neutral-100 gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400">Commission ID</span>
                  <p className="font-serif text-lg font-bold text-neutral-900">{ord.orderId}</p>
                  <p className="text-xs text-neutral-500">
                    Placed on {new Date(ord.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold bg-[#111111] text-[#C6A76B] border border-[#C6A76B]/40">
                    {ord.status}
                  </span>
                  <Link
                    to={`/track/${ord.orderId}`}
                    className="inline-flex items-center gap-1.5 bg-[#C6A76B] hover:bg-[#b39459] text-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Live</span>
                  </Link>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ord.orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-16 object-cover rounded-lg border border-neutral-200 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-neutral-900 truncate">{item.name}</p>
                      <p className="text-neutral-500">Size: {item.size} • Color: {item.color}</p>
                      <p className="font-semibold text-black">${item.price} (Qty: {item.quantity})</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Shipping info */}
              <div className="flex justify-between items-center pt-3 border-t border-neutral-100 text-xs">
                <span className="text-neutral-500">
                  Delivering to: <strong className="text-neutral-800">{ord.shippingAddress.city}, {ord.shippingAddress.country}</strong>
                </span>
                <span className="text-base font-extrabold text-black">
                  Total: ${ord.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
          <Package className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-neutral-900">No Past Commissions Found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
            When you acquire items from the atelier, their journey and live telemetry will appear here.
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-flex items-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

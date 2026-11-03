import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { fetchOrderByIdApi } from '../services/api';
import { Order } from '../types';
import { useUIStore } from '../store/useUIStore';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  const showToast = useUIStore((state) => state.showToast);

  useEffect(() => {
    // Launch gold & black confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6A76B', '#111111', '#E8E8E8', '#f3e7c4']
    });

    const loadOrder = async () => {
      if (!orderId) return;
      try {
        const data = await fetchOrderByIdApi(orderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadOrder();
  }, [orderId]);

  const handleCopyOrderId = () => {
    if (!orderId) return;
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    showToast('Order ID copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
        Haute Couture Commission Confirmed
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
        Thank You For Your Acquisition
      </h1>
      <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
        Your bespoke items have been reserved and routed to the Milan master tailoring atelier for white-glove inspection.
      </p>

      {/* Order Badge Card */}
      <div className="mt-8 p-6 bg-white rounded-3xl border border-neutral-200 shadow-xl text-left space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-neutral-100 gap-2">
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider">Unique Commission Reference</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-serif text-xl font-bold text-black">{orderId || 'VGX-ORD'}</span>
              <button
                onClick={handleCopyOrderId}
                className="p-1 rounded text-neutral-400 hover:text-black hover:bg-neutral-100"
                title="Copy reference"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-emerald-200">
            Payment Verified & Secured
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
          <div>
            <p className="text-neutral-400 uppercase tracking-wider text-[10px]">Estimated Delivery Date</p>
            <p className="font-bold text-black mt-0.5">
              {new Date(Date.now() + 4 * 24 * 3600 * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-neutral-400 uppercase tracking-wider text-[10px]">Dedicated Carrier</p>
            <p className="font-bold text-black mt-0.5">BlueDart / DHL VIP White-Glove Express</p>
          </div>
        </div>

        {order?.orderItems && (
          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Items in Commission</p>
            {order.orderItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-neutral-800">{item.name} ({item.size}) x{item.quantity}</span>
                <span className="font-bold text-black">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to={`/track/${orderId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
        >
          <Truck className="w-4 h-4 text-[#C6A76B]" />
          <span>Launch Live Order Radar Tracking</span>
        </Link>
        <Link
          to="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-black text-neutral-800 px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          <span>Continue Browsing Collections</span>
        </Link>
      </div>
    </div>
  );
};

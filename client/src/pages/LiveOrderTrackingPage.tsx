import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  AlertCircle,
  Search,
  RotateCw,
  XCircle,
  ShieldCheck
} from 'lucide-react';
import { trackOrderApi, cancelOrderApi } from '../services/api';
import { Order } from '../types';
import { useUIStore } from '../store/useUIStore';

export const LiveOrderTrackingPage: React.FC = () => {
  const { orderId: paramOrderId } = useParams<{ orderId: string }>();
  const [queryId, setQueryId] = useState(paramOrderId || 'VGX-98214');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [liveSocketConnected, setLiveSocketConnected] = useState(false);
  const showToast = useUIStore((state) => state.showToast);

  const statuses = [
    'Order Placed',
    'Payment Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const fetchTracking = async (idToFetch: string) => {
    if (!idToFetch.trim()) return;
    setLoading(true);
    try {
      const data = await trackOrderApi(idToFetch.trim());
      setOrder(data);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Order tracking not found', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramOrderId) {
      setQueryId(paramOrderId);
      fetchTracking(paramOrderId);
    } else {
      fetchTracking(queryId);
    }

    // Connect to Socket.IO for real-time status updates
    const socket = io('/', { transports: ['websocket', 'polling'] });

    socket.on('connect', () => {
      setLiveSocketConnected(true);
      if (paramOrderId || queryId) {
        socket.emit('join_order_room', paramOrderId || queryId);
      }
    });

    socket.on('order:status_updated', (data: any) => {
      showToast(`Live Update: Order transitioned to ${data.status}`, 'info');
      if (order && (order._id === data.orderId || order.orderId === data.systemOrderId)) {
        setOrder((prev) => (prev ? { ...prev, status: data.status } : null));
      } else {
        // Refetch to get fresh history
        fetchTracking(queryId);
      }
    });

    socket.on('disconnect', () => {
      setLiveSocketConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [paramOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(queryId);
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    if (window.confirm('Are you certain you wish to cancel this atelier commission?')) {
      try {
        await cancelOrderApi(order._id);
        showToast('Commission has been cancelled.', 'info');
        fetchTracking(order.orderId);
      } catch (err: any) {
        showToast(err.response?.data?.message || 'Cancellation ineligible', 'error');
      }
    }
  };

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    const idx = statuses.indexOf(order.status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header & Search */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
          High-Priority White-Glove Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
          Live Order Status Radar
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="text"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            placeholder="Enter Commission ID (e.g. VGX-98214)"
            className="flex-1 bg-white border border-neutral-300 rounded-xl px-4 py-3 text-xs text-neutral-900 font-medium focus:outline-none focus:border-[#C6A76B] shadow-sm"
          />
          <button
            type="submit"
            className="bg-[#111111] hover:bg-black text-[#C6A76B] px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md"
          >
            Locate
          </button>
        </form>

        {/* Live Socket Status Pill */}
        <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-[11px] text-neutral-600">
          <span className={`w-2 h-2 rounded-full ${liveSocketConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span>{liveSocketConnected ? 'Live Socket.IO Stream Synchronized' : 'Connecting Real-Time Telemetry...'}</span>
        </div>
      </div>

      {order ? (
        <div className="space-y-8">
          {/* Main Status Hero Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-neutral-100 gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-neutral-400">Commission Identifier</p>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">{order.orderId}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Tracking No: {order.trackingNumber}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-[#111111] text-[#C6A76B] px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold border border-[#C6A76B]/40">
                  {order.status}
                </span>
                {['Order Placed', 'Payment Confirmed', 'Processing'].includes(order.status) && (
                  <button
                    onClick={handleCancelOrder}
                    className="text-xs text-red-500 hover:text-red-700 underline font-medium"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="py-4">
              <div className="relative flex justify-between items-center">
                {/* Background Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-neutral-200 z-0" />
                <div
                  className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-[#C6A76B] z-0 transition-all duration-700"
                  style={{ width: `${(getCurrentStepIndex() / (statuses.length - 1)) * 100}%` }}
                />

                {statuses.map((st, idx) => {
                  const isDone = idx <= getCurrentStepIndex();
                  const isCurrent = idx === getCurrentStepIndex();

                  return (
                    <div key={st} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isDone
                            ? 'bg-[#111111] text-[#C6A76B] border-2 border-[#C6A76B] shadow-md'
                            : 'bg-white text-neutral-400 border-2 border-neutral-300'
                        } ${isCurrent ? 'scale-125 ring-4 ring-[#C6A76B]/30' : ''}`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-neutral-700 mt-2 text-center max-w-[65px] sm:max-w-none">
                        {st}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <Truck className="w-4 h-4 text-[#C6A76B] mb-1" />
                <p className="text-neutral-400 uppercase text-[10px]">Logistics Partner</p>
                <p className="font-bold text-black mt-0.5">{order.courierPartner || 'BlueDart Luxury Express'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <Clock className="w-4 h-4 text-[#C6A76B] mb-1" />
                <p className="text-neutral-400 uppercase text-[10px]">Estimated Handover</p>
                <p className="font-bold text-black mt-0.5">
                  {new Date(order.estimatedDelivery || Date.now() + 4 * 24 * 3600 * 1000).toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <MapPin className="w-4 h-4 text-[#C6A76B] mb-1" />
                <p className="text-neutral-400 uppercase text-[10px]">Destination Hub</p>
                <p className="font-bold text-black mt-0.5">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Timeline Tracking Logs */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-neutral-900 pb-2 border-b border-neutral-100">
              Detailed Telemetry Log
            </h3>

            <div className="space-y-4 pt-2">
              {order.trackingHistory && order.trackingHistory.length > 0 ? (
                order.trackingHistory.map((hist, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C6A76B] mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-neutral-900 uppercase tracking-wider">{hist.status}</span>
                        <span className="text-[11px] text-neutral-400">
                          {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                          {new Date(hist.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-neutral-500 mt-0.5 font-medium">{hist.location}</p>
                      <p className="text-neutral-600 mt-0.5">{hist.notes}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-400">Shipment log initialized.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="text-center py-16 bg-neutral-50 rounded-3xl border border-neutral-200">
            <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm text-neutral-600 font-medium">No active commission found for "{queryId}"</p>
            <p className="text-xs text-neutral-400 mt-1">Please check your Order Confirmation email or use test ID: <strong>VGX-98214</strong></p>
          </div>
        )
      )}
    </div>
  );
};

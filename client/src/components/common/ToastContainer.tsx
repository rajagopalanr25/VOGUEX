import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-[#111111]/95 text-white px-4 py-3.5 rounded-xl shadow-2xl border border-[#C6A76B]/40 max-w-sm animate-in slide-in-from-right duration-250 backdrop-blur-md"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C6A76B] shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}

          <p className="text-xs sm:text-sm font-medium flex-1 text-neutral-100">{toast.message}</p>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};


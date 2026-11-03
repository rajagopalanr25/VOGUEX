import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';
import { updateProfileApi } from '../services/api';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const showToast = useUIStore((state) => state.showToast);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addresses, setAddresses] = useState(user?.addresses || []);

  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateProfileApi({ name, phone, addresses });
      updateUser(updated);
      showToast('Client profile updated successfully.', 'success');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error updating profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newZip) return;

    const newAddr = {
      street: newStreet,
      city: newCity,
      state: newState || 'NY',
      postalCode: newZip,
      country: 'United States',
      type: 'Home' as const,
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, newAddr]);
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewZip('');
    setShowAddressForm(false);
    showToast('New delivery destination added to profile.', 'success');
  };

  const handleDeleteAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
    showToast('Address removed.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b border-neutral-200">
        <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">Client Credentials</span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Profile & Concierge Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm text-center space-y-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#C6A76B] shadow-md"
          />
          <div>
            <h3 className="font-serif text-lg font-bold text-neutral-900">{user?.name}</h3>
            <p className="text-xs text-neutral-400">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-[#111111] text-[#C6A76B] text-[10px] uppercase tracking-widest font-bold rounded-full">
              {user?.role === 'admin' ? 'Atelier Director' : 'VIP Circle Member'}
            </span>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <h3 className="font-serif text-lg font-bold text-neutral-900 pb-3 border-b border-neutral-100">
            Personal Information
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C6A76B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Email Address</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Direct Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C6A76B]"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {saving ? 'Updating...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      </div>

      {/* Address Book */}
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-neutral-900">Saved Shipping Destinations</h3>
            <p className="text-xs text-neutral-500">Manage addresses for fast one-click checkout.</p>
          </div>
          <button
            onClick={() => setShowAddressForm(!showAddressForm)}
            className="flex items-center gap-1.5 bg-[#C6A76B] text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-[#b39459] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Address</span>
          </button>
        </div>

        {/* Address Form */}
        {showAddressForm && (
          <form onSubmit={handleAddAddress} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">New Destination</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Street & Suite Number"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs"
                required
              />
              <input
                type="text"
                placeholder="State / Region"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs"
                required
              />
              <input
                type="text"
                placeholder="Postal / ZIP Code"
                value={newZip}
                onChange={(e) => setNewZip(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-xl"
              >
                Save Destination
              </button>
              <button
                type="button"
                onClick={() => setShowAddressForm(false)}
                className="text-xs text-neutral-500 hover:text-black px-3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Address Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex justify-between items-start">
              <div className="text-xs space-y-1">
                <span className="font-bold text-neutral-900 uppercase tracking-wider">{addr.type || 'Home'} Destination</span>
                <p className="text-neutral-700">{addr.street}</p>
                <p className="text-neutral-500">{addr.city}, {addr.state} {addr.postalCode}</p>
                <p className="text-neutral-500">{addr.country}</p>
              </div>
              <button
                onClick={() => handleDeleteAddress(idx)}
                className="text-neutral-400 hover:text-red-500 p-1"
                title="Remove address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the interactive 3D virtual atelier operate?',
      a: 'Our 3D experience is rendered natively in your web browser utilizing WebGL and Three.js. You can rotate products 360 degrees, zoom in to examine micro-weaves, and switch daylight/studio shading with zero external plugins needed.'
    },
    {
      q: 'What are your white-glove shipping timelines and partners?',
      a: 'We partner with BlueDart, DHL Express VIP, and dedicated courier networks worldwide. Orders over $200 receive complimentary express transit (2 to 4 business days). Every item arrives in an embossed magnetic presentation box with custom dust bag and wooden hanger.'
    },
    {
      q: 'How do I ensure exact tailored sizing before ordering?',
      a: 'Refer to our interactive Sizing & Fit Architecture available on every product page. You can input your height and weight for an automated fit calculation or consult with our VIP Stylist team via live chat or concierge wire.'
    },
    {
      q: 'What is your return and exchange policy for couture garments?',
      a: 'We offer 30-day complimentary returns on unworn items with security ribbons intact. Returns can be booked with direct courier pickup from your home or office.'
    },
    {
      q: 'Which payment methods and currencies are supported?',
      a: 'We support Razorpay, Visa, Mastercard, American Express, Apple Pay, UPI, and Cash on Delivery in select metropolitan territories. All payments undergo 256-bit server-side verification.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
          Client Advisory
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
          Frequently Addressed Queries
        </h1>
        <p className="text-xs text-neutral-500">
          Essential insights regarding atelier acquisitions, shipping, and 3D modeling.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <span className="font-serif text-base font-bold text-neutral-900">{f.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#C6A76B] transition-transform duration-200 shrink-0 ml-4 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-6 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 animate-in fade-in">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


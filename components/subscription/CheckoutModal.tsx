'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

async function handleSubscribe() {
  await new Promise(res => setTimeout(res, 1000));
  return { success: true, orderId: "ORD-" + Date.now() };
}

export function CheckoutModal({ plan, onClose }: { plan: any, onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await handleSubscribe();
    setLoading(false);
    onClose();
    alert('Subscription successful!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6 relative"
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 id="modal-title" className="text-xl font-bold mb-6">Checkout: {plan.name}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="checkout-name" className="text-sm font-medium">Full Name</label>
            <Input id="checkout-name" required placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="checkout-email" className="text-sm font-medium">Email</label>
            <Input id="checkout-email" type="email" required placeholder="john@example.com" />
          </div>
          <div className="font-medium text-lg py-2">Total: Rp {plan.price.toLocaleString('id-ID')}</div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button disabled={loading} type="submit">
              {loading ? 'Processing...' : 'Confirm Payment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";

async function handleSubscribe() {
  await new Promise(res => setTimeout(res, 1000));
  return { success: true, orderId: "ORD-" + Date.now() };
}

export default function CheckoutModal({ plan, onClose }: { plan: any; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Checkout: {plan.name}</h2>
        <p>Confirm subscription for Rp {plan.price.toLocaleString()}?</p>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={async () => { await handleSubscribe(); onClose(); }} className="px-4 py-2 bg-blue-600 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
}

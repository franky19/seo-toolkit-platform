"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4" role="dialog" aria-modal="true">
      <div ref={modalRef} className="bg-card border border-border p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-3 text-foreground">Checkout: {plan.name}</h2>
        <p className="text-muted-foreground mb-6">Confirm subscription for <span className="font-bold text-foreground">Rp {plan.price.toLocaleString('id-ID')}</span> per month?</p>
        
        <div className="flex flex-col gap-3">
          <button onClick={async () => { await handleSubscribe(); onClose(); }} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">Confirm Subscription</button>
          <button onClick={onClose} className="w-full py-3 border border-border bg-card text-foreground rounded-xl font-medium hover:bg-accent transition-all">Cancel</button>
        </div>
      </div>
    </div>
  );
}

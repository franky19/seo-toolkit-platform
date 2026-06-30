"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/checkout/success");
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" required className="w-full p-2 border rounded" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" required className="w-full p-2 border rounded" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input type="tel" required className="w-full p-2 border rounded" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
        <p className="text-sm text-yellow-600 italic">Pembayaran sedang dalam tahap integrasi. Permintaan langganan akan dicatat terlebih dahulu.</p>
        <p className="text-sm text-gray-600">
          By clicking &quot;Proceed to Payment&quot;, you agree to our{" "}
          <a href="/terms-and-conditions" className="text-blue-600 underline" target="_blank">Terms & Conditions</a> and{" "}
          <a href="/refund-policy" className="text-blue-600 underline" target="_blank">Refund Policy</a>.
        </p>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded font-bold">Proceed to Payment</button>
      </form>
    </div>
  );
}

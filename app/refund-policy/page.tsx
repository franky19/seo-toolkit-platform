export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Kebijakan Pengembalian Dana</h1>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <ul className="list-disc ml-6 space-y-2">
          <li>Refund requests accepted within 7 days after purchase.</li>
          <li>Refund only applies if service cannot be delivered.</li>
          <li>Refund requests must be submitted through official contact channels.</li>
          <li>Approved refunds are processed within 7–14 business days.</li>
        </ul>
      </div>
    </div>
  );
}
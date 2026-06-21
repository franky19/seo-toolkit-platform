export default function ContactSection() {
  return (
    <section className="mt-8 p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <div className="text-sm space-y-2">
        <p>Email Support: <a href="mailto:support@seotoolkit.com" className="text-blue-500 underline">support@seotoolkit.com</a></p>
        <p>Business Inquiry: <a href="mailto:business@seotoolkit.com" className="text-blue-500 underline">business@seotoolkit.com</a></p>
        <p>WhatsApp Business: <a href="https://wa.me/6281234567890" className="text-blue-500 underline">+62 812 3456 7890</a></p>
        <p className="font-semibold mt-4">Response Time SLA: 24–48 hours</p>
      </div>
    </section>
  );
}

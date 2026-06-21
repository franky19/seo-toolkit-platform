export default function ContactSection() {
  return (
    <section className="mt-8 p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <div className="text-sm space-y-2">
        <p>Email Support: <a href="mailto:support@seotoolkit.plugflow.my.id" className="text-blue-500 underline">support@seotoolkit.plugflow.my.id</a></p>
        <p>Business Inquiry: <a href="mailto:business@seotoolkit.plugflow.my.id" className="text-blue-500 underline">business@seotoolkit.plugflow.my.id</a></p>
        <p>WhatsApp Business: <a href="https://wa.me/6283802147432" className="text-blue-500 underline">+62 838 0214 7432</a></p>
        <p className="font-semibold mt-4">Response Time SLA: 24–48 hours</p>
      </div>
    </section>
  );
}

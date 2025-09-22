export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <p className="mb-4">
          We value your privacy. This Privacy Policy explains how we collect, use, and safeguard your
          information when you interact with our website and services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Information We Collect</h2>
        <p className="mb-4">
          When you submit an inquiry, we may collect your name, email address, phone number, and details about
          your request so we can respond and provide our services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To respond to your inquiries and provide customer support.</li>
          <li>To improve our website, services, and user experience.</li>
          <li>To communicate important updates related to your requests.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">Data Sharing</h2>
        <p className="mb-4">
          We do not sell your personal information. We may share data with service providers strictly as needed
          to operate and improve our services (e.g., form processing and analytics), following appropriate
          safeguards.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Data Retention</h2>
        <p className="mb-4">
          We retain your information only for as long as necessary to fulfill the purposes outlined in this
          policy or as required by law.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Your Rights</h2>
        <p className="mb-4">
          You may request access, correction, or deletion of your personal information. To exercise your rights,
          contact us at the email provided on our website.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
        <p>If you have any questions about this Privacy Policy, please contact us via the contact form.</p>
      </main>
    </div>
  )
}



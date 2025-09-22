export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <p className="mb-4">
          These Terms of Service ("Terms") govern your use of our website and services. By accessing or using
          our site, you agree to be bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Use of the Service</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>You agree to use the site for lawful purposes only.</li>
          <li>You will not attempt to disrupt or compromise the security of the service.</li>
          <li>You are responsible for information you submit through forms on this site.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">Intellectual Property</h2>
        <p className="mb-4">
          All content on this site, including text, graphics, logos, and media, is the property of the site
          owner or its licensors and is protected by applicable laws.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Disclaimer</h2>
        <p className="mb-4">
          The service is provided "as is" without warranties of any kind. We do not warrant that the site will
          be uninterrupted or error-free.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or
          consequential damages arising from your use of the service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of the site after changes constitutes
          acceptance of the updated Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
        <p>If you have any questions about these Terms, please contact us via the contact form.</p>
      </main>
    </div>
  )
}



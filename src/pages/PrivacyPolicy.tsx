const PrivacyPolicy = () => (
  <div>
    <section className="pt-24 pb-16 bg-navy">
      <div className="container mx-auto px-4 pt-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-xl text-white/70 max-w-3xl">
          How PrivaLex Advisory collects, uses, and protects your personal data.
        </p>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Who We Are</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          PrivaLex Advisory Limited is a data protection and technology compliance advisory firm with offices in Lagos, Nigeria and London, United Kingdom. We are the data controller for personal data collected through this website and our services.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Contact: <a href="mailto:contact@privalexadvisory.com" className="text-teal hover:underline">contact@privalexadvisory.com</a>
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Data We Collect</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">We may collect the following categories of personal data:</p>
        <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
          <li>Identity data: name, organisation</li>
          <li>Contact data: email address, phone number</li>
          <li>Usage data: pages visited, browser type, IP address</li>
          <li>Communications: messages sent via our contact form or email</li>
          <li>Training data: registration details for Academy programmes</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. How We Use Your Data</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">We use personal data to:</p>
        <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
          <li>Respond to enquiries and provide our services</li>
          <li>Process training registrations and issue certificates</li>
          <li>Send regulatory updates and newsletters (where you have subscribed)</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Legal Basis for Processing</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          We process personal data on the basis of contract performance, legitimate interests, consent (for marketing communications), and legal obligation, in accordance with the Nigeria Data Protection Act 2023 and, where applicable, the UK GDPR.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Data Sharing</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          We do not sell personal data. We may share data with trusted service providers (e.g., hosting providers, email platforms) under appropriate data processing agreements. We may disclose data where required by law.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Data Retention</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          We retain personal data for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. Training records are retained for the period necessary to support certification and regulatory compliance.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Your Rights</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
          <li>Access your personal data</li>
          <li>Rectify inaccurate data</li>
          <li>Request erasure of your data</li>
          <li>Withdraw consent at any time (where processing is consent-based)</li>
          <li>Object to processing</li>
          <li>Lodge a complaint with the Nigeria Data Protection Commission (NDPC) or the UK Information Commissioner's Office (ICO)</li>
        </ul>
        <p className="text-foreground/80 leading-relaxed mb-6">
          To exercise your rights, contact us at <a href="mailto:contact@privalexadvisory.com" className="text-teal hover:underline">contact@privalexadvisory.com</a>.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Cookies</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Our website uses essential cookies to function. We may also use analytics cookies to understand how visitors use the site. You can manage cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Changes to This Policy</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          We may update this Privacy Policy from time to time. The most recent version will always be available on this page.
        </p>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;

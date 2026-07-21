"use client";

import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";

export default function Privacy() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      date="Last updated: 14 June 2022"
    >
      <p>
        At Radical Thinking Web Design, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data we gather when you interact with our website and services. By using our website and services, you consent to the practices described in this policy.
      </p>

      <h2>Information Collection and Use</h2>
      <p>
        We may collect certain personally identifiable information, such as your name, email address, and contact details when you voluntarily provide it to us. This information is used to communicate with you, fulfill your requests, and provide you with the best possible services.
      </p>
      <p>
        We may also collect non-personally identifiable information, such as your IP address and browsing patterns, when you interact with our website and services. This information is used to analyze website traffic, enhance user experience, and improve our services.
      </p>

      <h2>Cookies and Analytics</h2>
      <p>
        We use cookies and similar technologies to collect and store information when you visit our website. Cookies are small files that are stored on your computer or mobile device. They allow us to track your website activity and preferences, and to improve your experience on our website.
      </p>
      <p>
        We use Google Analytics GA4, Google ReCaptcha, and Zoho PageSense to analyze website traffic, enhance user experience, and improve our services. These tools may collect anonymous data, such as your IP address and browsing patterns, through the use of cookies. You can adjust your browser settings to manage cookie preferences.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no data transmission over the internet or electronic storage method can guarantee absolute security.
      </p>

      <h2>Third-Party Disclosure</h2>
      <p>
        We may share your personal information with trusted third-party service providers, such as hosting and analytics platforms, to assist us in delivering our services effectively. These third parties are bound by strict confidentiality agreements and are prohibited from using your information for any other purpose.
      </p>

      <h2>Your Choices and Rights</h2>
      <p>
        You have the right to review, update, or delete your personal information held by us. If you wish to exercise these rights or have any questions regarding our Privacy Policy, please contact us using the provided contact information below.
      </p>

      <h2>Updates to the Privacy Policy</h2>
      <p>
        We reserve the right to modify or update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes. Your continued use of our website and services after any modifications indicate your acceptance of the updated Privacy Policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any concerns or inquiries regarding our Privacy Policy or the handling of your personal information, please{" "}
        <Link href="/chat">contact us in the chat</Link>. We are dedicated to addressing your privacy concerns and ensuring the protection of your information.
      </p>
    </LegalPageLayout>
  );
}

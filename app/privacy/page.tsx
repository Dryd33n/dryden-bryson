import type { ReactNode } from 'react';
import BlinkingSquares from '../components/backgrounds/BlinkingSquares';
import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/navigation/Navbar';
import { aboutItems, contactItems, home, portfolioItems } from '@/lib/menuItems';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Privacy Policy | Dryden Bryson",
  description: "How dryd3n.ca handles contact form submissions, analytics, and other visitor data.",
  path: "/privacy",
});

const CONTACT_EMAIL = "drydenbryson@dryd3n.ca";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex flex-col gap-4 text-sm md:text-base text-neutral-700 dark:text-white/80">{children}</div>
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-strong hover:underline">
      {children}
    </a>
  );
}

export default function Privacy() {
  return (<div className="relative">
    <BlinkingSquares />

    {/* HEADER */}
    <div className="relative">
      <div className="relative z-10 px-6 pt-6 lg:absolute lg:top-6 lg:left-6 lg:p-0">
        <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
      </div>
      <PageHeader title="PRIVACY" />
    </div>

    <div className="pb-12 md:pb-30 px-4 md:px-10 lg:px-40">
      <div className="md:mr-[40%]">
        <p className="text-xs md:text-sm text-neutral-500 dark:text-[#a3a3a3] mb-8">Last updated: November 7, 2026</p>

        <Section title="OVERVIEW">
          <p>
            This is the personal portfolio of Dryden Bryson, based in Victoria, BC, Canada. This policy covers dryd3n.ca.
            You don&apos;t need an account to use the site, and the only personal information I ask for is what you choose to send through the contact form.
          </p>
        </Section>

        <Section title="CONTACT FORM">
          <p>
            If you use the contact form, I collect your name, email address, subject and message, and use them only to read and reply to your message.
            The site has no database of submissions: your message is delivered to my email inbox through{' '}
            <ExternalLink href="https://resend.com/legal/privacy-policy">Resend</ExternalLink>, an email delivery service.
          </p>
          <p>
            I keep messages for as long as they&apos;re useful for the conversation, and you can ask me to delete yours at any time.
          </p>
        </Section>

        <Section title="ANALYTICS">
          <p>
            The site uses <ExternalLink href="https://vercel.com/docs/analytics/privacy-policy">Vercel Web Analytics</ExternalLink> to count page views.
            For each view it can record the time, page URL, referring site, approximate location, browser, operating system and device type.
            It doesn&apos;t use third-party cookies. Visitors are distinguished by a hash of the incoming request, which is discarded after 24 hours, and I only see aggregated statistics.
          </p>
          <p>
            <ExternalLink href="https://vercel.com/docs/speed-insights/privacy-policy">Vercel Speed Insights</ExternalLink> measures how quickly pages load.
            It records the page, loading metrics, network speed, browser, operating system, device type and country, and isn&apos;t tied to individual visitors.
          </p>
        </Section>

        <Section title="HOSTING AND CONTENT DELIVERY">
          <p>
            The site is hosted on <ExternalLink href="https://vercel.com/legal/privacy-policy">Vercel</ExternalLink>, which, like most hosts, processes technical request data such as IP addresses in order to serve pages and keep them secure.
          </p>
          <p>
            Some school project documents are loaded directly from{' '}
            <ExternalLink href="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net">jsDelivr</ExternalLink>, a public content delivery network, which receives your IP address when you open them.
          </p>
          <p>
            These providers may process data outside Canada, including in the United States. Their own privacy policies apply to that processing.
          </p>
        </Section>

        <Section title="BROWSER STORAGE">
          <p>
            The site saves your light or dark theme choice in your browser&apos;s local storage so it&apos;s remembered between visits.
            That setting stays on your device, and you can remove it by clearing your browser&apos;s site data.
          </p>
          <p>
            While you write a message, the contact form keeps a draft in your browser&apos;s session storage so it isn&apos;t lost if you visit another page.
            The draft stays on your device until you send the message or close the tab.
          </p>
        </Section>

        <Section title="SHARING">
          <p>
            I don&apos;t sell your personal information or use it for advertising. It&apos;s only shared with the service providers listed above, or if the law requires it.
          </p>
        </Section>

        <Section title="EXTERNAL LINKS">
          <p>
            The site links to other sites, such as GitHub and LinkedIn. Once you follow a link, that site&apos;s own privacy policy applies.
          </p>
        </Section>

        <Section title="YOUR CHOICES">
          <p>
            You can ask me what personal information I hold about you, or ask me to correct or delete it, by emailing{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-strong hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="CHANGES">
          <p>
            If this policy changes, I&apos;ll update it here and change the date at the top of the page.
          </p>
        </Section>
      </div>
    </div>
  </div>)
}

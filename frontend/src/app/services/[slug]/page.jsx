import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/dataLoader';
import siteConfig from '@/config/siteConfig';
import HeroA from '@/app/components/HeroVariants/HeroA';
import HeroB from '@/app/components/HeroVariants/HeroB';
import HeroC from '@/app/components/HeroVariants/HeroC';
import HeroE from '@/app/components/HeroVariants/HeroE';
import EnquiryForm from '@/app/components/Forms/EnquiryForm';
import CTAButton from '@/app/components/CTAButtons';

// Generate static params for all services
export async function generateStaticParams() {
    const slugs = await getAllServiceSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: service.seo.title,
        description: service.seo.description,
        openGraph: {
            title: service.seo.title,
            description: service.seo.description,
            type: 'website',
            url: `${siteConfig.websiteUrl}${service.seo.canonical}`,
        },
        alternates: {
            canonical: service.seo.canonical,
        },
    };
}

// Hero variant mapping
const HERO_VARIANTS = {
    'hero-a': HeroA,
    'hero-b': HeroB,
    'hero-c': HeroC,
    'hero-e': HeroE,
    'service-detail': HeroA, // Default
};

export default async function ServicePage({ params }) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    // Select Hero component based on layoutVariant
    const HeroComponent = HERO_VARIANTS[service.layoutVariant] || HeroA;

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: service.title,
        description: service.seo.description,
        provider: {
            '@type': 'Organization',
            name: siteConfig.companyName,
            url: siteConfig.websiteUrl,
            logo: `${siteConfig.websiteUrl}${siteConfig.logo.url}`,
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: siteConfig.contactNumber,
                email: siteConfig.email,
                contactType: 'Customer Service',
            },
        },
        areaServed: {
            '@type': 'Country',
            name: 'India',
        },
        url: `${siteConfig.websiteUrl}${service.seo.canonical}`,
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main>
                {/* Hero Section */}
                <HeroComponent
                    headline={service.title}
                    subtext={service.seo.description}
                    ctaText="Get Started"
                    ctaHref="/contact-us"
                />

                {/* Main Content */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-12">

                            {/* Main Content Column */}
                            <div className="lg:col-span-2">
                                {/* Overview */}
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-dark-900">
                                        About {service.title}
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                        {service.seo.description}
                                    </p>

                                    {/* Category Badge */}
                                    <div className="flex gap-3 mb-6">
                                        <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                            {service.category}
                                        </span>
                                        {service.subCategory && (
                                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                {service.subCategory}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Process/Benefits Section */}
                                <div className="mb-12 bg-gray-50 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { step: '1', title: 'Consultation', desc: 'Share your requirements with our expert' },
                                            { step: '2', title: 'Documentation', desc: 'We prepare and verify all documents' },
                                            { step: '3', title: 'Filing', desc: 'Submit application to authorities' },
                                            { step: '4', title: 'Delivery', desc: 'Receive your certificate/license' },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4">
                                                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                                    {item.step}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-dark-900 mb-1">{item.title}</h4>
                                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                q: `What documents are required for ${service.title}?`,
                                                a: 'Our expert will provide you with a complete checklist after understanding your specific requirements.',
                                            },
                                            {
                                                q: 'How long does the process take?',
                                                a: 'Typical processing time ranges from 7-15 business days, depending on government procedures.',
                                            },
                                            {
                                                q: 'What is the pricing?',
                                                a: 'Contact us for a customized quote based on your specific needs. We offer transparent, all-inclusive pricing.',
                                            },
                                        ].map((faq, i) => (
                                            <details key={i} className="group bg-white border border-gray-200 rounded-lg p-4">
                                                <summary className="font-bold text-dark-900 cursor-pointer list-none flex justify-between items-center">
                                                    {faq.q}
                                                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                                                </summary>
                                                <p className="mt-3 text-gray-600">{faq.a}</p>
                                            </details>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="bg-dark-900 text-white rounded-2xl p-8 text-center">
                                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                                    <p className="text-gray-300 mb-6">
                                        Let our experts handle your {service.title} process end-to-end.
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <CTAButton href="/contact-us" className="bg-primary-500 hover:bg-primary-600">
                                            Contact Us
                                        </CTAButton>
                                        <CTAButton href={`tel:${siteConfig.contactNumber}`} variant="outline" className="border-white text-white hover:bg-white/10">
                                            Call Now
                                        </CTAButton>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-6">
                                    {/* Enquiry Form */}
                                    <EnquiryForm serviceName={service.title} />

                                    {/* Info Box */}
                                    <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
                                        <h4 className="font-bold text-dark-900 mb-4">Why Choose Us?</h4>
                                        <ul className="space-y-3 text-sm text-gray-700">
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary-600">✓</span>
                                                <span>Expert legal professionals</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary-600">✓</span>
                                                <span>Transparent pricing</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary-600">✓</span>
                                                <span>End-to-end support</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary-600">✓</span>
                                                <span>5000+ satisfied clients</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

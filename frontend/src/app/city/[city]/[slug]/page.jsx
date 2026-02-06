import { notFound } from 'next/navigation';
import { getServiceBySlug, getCities } from '@/lib/dataLoader';
import siteConfig from '@/config/siteConfig';
import HeroA from '@/app/components/HeroVariants/HeroA';
import HeroB from '@/app/components/HeroVariants/HeroB';
import HeroC from '@/app/components/HeroVariants/HeroC';
import HeroE from '@/app/components/HeroVariants/HeroE';
import EnquiryForm from '@/app/components/Forms/EnquiryForm';
import CTAButton from '@/app/components/CTAButtons';

// Generate static params for all city/service combinations
export async function generateStaticParams() {
    const cities = await getCities();
    const servicesModule = await import('@/data/services.json');
    const services = servicesModule.default;

    const params = [];
    cities.forEach(city => {
        services.forEach(service => {
            params.push({
                city: city.citySlug,
                slug: service.slug,
            });
        });
    });

    return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const cities = await getCities();
    const city = cities.find(c => c.citySlug === params.city);
    const service = await getServiceBySlug(params.slug);

    if (!city || !service) {
        return {
            title: 'Page Not Found',
        };
    }

    const cityTitle = `${service.title} in ${city.cityName}`;
    const cityDescription = `${service.seo.description} ${city.seoModifier}`;
    const cityCanonical = `/city/${city.citySlug}/${service.slug}`;

    return {
        title: `${cityTitle} - ${siteConfig.companyName}`,
        description: cityDescription,
        openGraph: {
            title: cityTitle,
            description: cityDescription,
            type: 'website',
            url: `${siteConfig.websiteUrl}${cityCanonical}`,
        },
        alternates: {
            canonical: cityCanonical,
        },
    };
}

// Hero variant mapping
const HERO_VARIANTS = {
    'hero-a': HeroA,
    'hero-b': HeroB,
    'hero-c': HeroC,
    'hero-e': HeroE,
    'service-detail': HeroA,
};

export default async function CityServicePage({ params }) {
    const cities = await getCities();
    const city = cities.find(c => c.citySlug === params.city);
    const service = await getServiceBySlug(params.slug);

    if (!city || !service) {
        notFound();
    }

    // Select Hero component based on layoutVariant
    const HeroComponent = HERO_VARIANTS[service.layoutVariant] || HeroA;

    // City-specific content
    const cityServiceTitle = `${service.title} in ${city.cityName}`;
    const cityIntro = `Looking for ${service.title.toLowerCase()} in ${city.cityName}, ${city.state}? ${city.seoModifier} ${siteConfig.companyName} provides comprehensive ${service.title.toLowerCase()} services across ${city.cityName} and surrounding areas.`;

    // JSON-LD Structured Data with city context
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: cityServiceTitle,
        description: cityIntro,
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
            '@type': 'City',
            name: city.cityName,
            containedIn: {
                '@type': 'State',
                name: city.state,
            },
        },
        url: `${siteConfig.websiteUrl}/city/${city.citySlug}/${service.slug}`,
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main>
                {/* Hero Section with city context */}
                <HeroComponent
                    headline={cityServiceTitle}
                    subtext={cityIntro}
                    ctaText="Get Started in ${city.cityName}"
                    ctaHref="/contact-us"
                />

                {/* Main Content */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-12">

                            {/* Main Content Column */}
                            <div className="lg:col-span-2">
                                {/* City-specific Overview */}
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-dark-900">
                                        {cityServiceTitle} - Expert Services
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                        {cityIntro}
                                    </p>

                                    {/* Location Info */}
                                    <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                                        <p className="text-sm text-dark-900">
                                            <strong>📍 Serving:</strong> {city.cityName}, {city.state} and nearby areas
                                        </p>
                                    </div>

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
                                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {city.cityName}
                                        </span>
                                    </div>
                                </div>

                                {/* Process Section */}
                                <div className="mb-12 bg-gray-50 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold mb-6">
                                        How to Get {service.title} in {city.cityName}
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { step: '1', title: 'Free Consultation', desc: `Connect with our ${city.cityName}-based expert` },
                                            { step: '2', title: 'Documentation', desc: 'We prepare and verify all required documents' },
                                            { step: '3', title: 'Filing & Processing', desc: 'Submit application to relevant authorities' },
                                            { step: '4', title: 'Delivery', desc: `Receive your certificate in ${city.cityName}` },
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

                                {/* Why Choose Us in [City] */}
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6">
                                        Why Choose {siteConfig.companyName} in {city.cityName}?
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex gap-3">
                                            <span className="text-2xl">🏢</span>
                                            <div>
                                                <h4 className="font-bold text-dark-900 mb-1">Local Expertise</h4>
                                                <p className="text-sm text-gray-600">Deep understanding of {city.cityName} business landscape</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="text-2xl">⚡</span>
                                            <div>
                                                <h4 className="font-bold text-dark-900 mb-1">Fast Processing</h4>
                                                <p className="text-sm text-gray-600">Quick turnaround times for {city.cityName} clients</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="text-2xl">💰</span>
                                            <div>
                                                <h4 className="font-bold text-dark-900 mb-1">Transparent Pricing</h4>
                                                <p className="text-sm text-gray-600">No hidden costs, clear pricing structure</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="text-2xl">👥</span>
                                            <div>
                                                <h4 className="font-bold text-dark-900 mb-1">Dedicated Support</h4>
                                                <p className="text-sm text-gray-600">Personalized assistance throughout the process</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6">
                                        Frequently Asked Questions - {city.cityName}
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                q: `What documents are required for ${service.title} in ${city.cityName}?`,
                                                a: `Document requirements are standard across India. Our ${city.cityName} team will provide you with a complete checklist based on your specific situation.`,
                                            },
                                            {
                                                q: `How long does ${service.title} take in ${city.cityName}?`,
                                                a: 'Typical processing time is 7-15 business days, though local government processing times may vary.',
                                            },
                                            {
                                                q: `Do you have an office in ${city.cityName}?`,
                                                a: `Yes, we serve clients across ${city.cityName} and ${city.state}. Contact us for consultation and we'll guide you through the entire process.`,
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
                                    <h3 className="text-2xl font-bold mb-4">
                                        Ready to Get Started in {city.cityName}?
                                    </h3>
                                    <p className="text-gray-300 mb-6">
                                        Let our experts handle your {service.title} process in {city.cityName} end-to-end.
                                    </p>
                                    <div className="flex gap-4 justify-center flex-wrap">
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
                                    <EnquiryForm serviceName={`${service.title} in ${city.cityName}`} />

                                    {/* Info Box */}
                                    <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
                                        <h4 className="font-bold text-dark-900 mb-4">
                                            Serving {city.cityName}
                                        </h4>
                                        <ul className="space-y-3 text-sm text-gray-700">
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary-600">✓</span>
                                                <span>Local legal professionals</span>
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
                                                <span>Fast processing in {city.cityName}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Other Cities */}
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h4 className="font-bold text-dark-900 mb-4">
                                            Also Available In
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {cities
                                                .filter(c => c.citySlug !== city.citySlug)
                                                .slice(0, 6)
                                                .map(otherCity => (
                                                    <a
                                                        key={otherCity.citySlug}
                                                        href={`/city/${otherCity.citySlug}/${service.slug}`}
                                                        className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs hover:border-primary-500 hover:text-primary-600 transition-colors"
                                                    >
                                                        {otherCity.cityName}
                                                    </a>
                                                ))}
                                        </div>
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

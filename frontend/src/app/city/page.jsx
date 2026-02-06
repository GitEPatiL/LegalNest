import { getCities } from '@/lib/dataLoader';
import Link from 'next/link';
import HeroB from '../../components/HeroVariants/HeroB';

export const metadata = {
    title: 'Our Service Locations - LegalNest',
    description: 'Browse legal and compliance services available in cities across India.',
};

export default async function CitiesPage() {
    const cities = await getCities();

    return (
        <main>
            <HeroB
                headline="Our Service Locations"
                subtext="We provide comprehensive legal and compliance services across major cities in India"
                ctaText="Contact Us"
                ctaHref="/contact-us"
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cities.map((city) => (
                            <Link
                                key={city.citySlug}
                                href={`/city/${city.citySlug}`}
                                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-primary-500 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-dark-900 group-hover:text-primary-600 transition-colors">
                                            {city.cityName}
                                        </h3>
                                        <p className="text-sm text-gray-500">{city.state}</p>
                                    </div>
                                    <span className="text-2xl">📍</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    {city.seoModifier}
                                </p>
                                <div className="flex items-center text-primary-600 text-sm font-medium group-hover:translate-x-2 transition-transform">
                                    View Services →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

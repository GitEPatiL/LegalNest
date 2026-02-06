import { getAllServices } from '@/lib/dataLoader';
import ServiceCard from '../components/ServiceCard';
import HeroE from '../components/HeroVariants/HeroE';

export const metadata = {
    title: 'Our Services - LegalNest',
    description: 'Browse our comprehensive range of legal and compliance services for businesses in India.',
};

export default async function ServicesPage() {
    const services = await getAllServices();

    // Group services by category
    const servicesByCategory = services.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {});

    return (
        <main>
            <HeroE
                headline="Our Services"
                ctaText="Get Started"
                ctaHref="/contact-us"
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                        <div key={category} className="mb-16">
                            <h2 className="text-3xl font-bold mb-8 text-dark-900 border-b-2 border-primary-500 inline-block pb-2">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                {categoryServices.map((service, index) => (
                                    <ServiceCard key={service.id} service={service} index={index} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

/**
 * Service Variation Templates
 * Creates unique, valuable service variations based on industries, company sizes, and use cases
 */

// Industry-specific variations
export const industryVariations = [
    {
        id: 'ecommerce',
        name: 'E-commerce',
        keywords: ['online store', 'digital marketplace', 'online retail'],
        challenges: ['high transaction volume', 'interstate sales', 'digital product regulations'],
        benefits: ['streamlined compliance', 'multi-state registration support', 'digital-first processes']
    },
    {
        id: 'restaurant',
        name: 'Restaurant & Food Service',
        keywords: ['food business', 'eatery', 'food service'],
        challenges: ['food safety compliance', 'health regulations', 'vendor management'],
        benefits: ['food license bundling', 'health compliance support', 'vendor registration']
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing',
        keywords: ['production', 'factory', 'manufacturing unit'],
        challenges: ['factory compliance', 'labour regulations', 'environmental clearances'],
        benefits: ['comprehensive factory setup', 'labour law compliance', 'environmental permits']
    },
    {
        id: 'saas',
        name: 'SaaS & Software',
        keywords: ['software company', 'tech startup', 'SaaS business'],
        challenges: ['IP protection', 'international clients', 'data regulations'],
        benefits: ['IP strategy support', 'global compliance', 'data protection guidance']
    },
    {
        id: 'consulting',
        name: 'Consulting Services',
        keywords: ['professional services', 'consultancy', 'advisory'],
        challenges: ['professional tax', 'service contracts', 'multi-city operations'],
        benefits: ['minimal compliance burden', 'contract templates', 'multi-location support']
    },
    {
        id: 'retail',
        name: 'Retail',
        keywords: ['retail store', 'shop', 'retail outlet'],
        challenges: ['shop license', 'inventory compliance', 'multiple locations'],
        benefits: ['shop registration bundling', 'inventory management compliance', 'chain store support']
    },
    {
        id: 'healthcare',
        name: 'Healthcare & Pharma',
        keywords: ['clinic', 'pharmacy', 'healthcare'],
        challenges: ['medical licensing', 'drug regulations', 'health compliance'],
        benefits: ['medical license support', 'drug license bundling', 'health authority compliance']
    },
    {
        id: 'education',
        name: 'Education & Training',
        keywords: ['training institute', 'education', 'coaching'],
        challenges: ['educational compliance', 'certification standards', 'student safety'],
        benefits: ['institute registration', 'compliance certification', 'safety standards support']
    },
];

// Company size variations
export const companySizeVariations = [
    {
        id: 'startup',
        name: 'Startups',
        revenue: '< 50L',
        employees: '1-10',
        focus: ['fast setup', 'cost-effective', 'minimal compliance'],
        pricing: 'budget-friendly',
    },
    {
        id: 'small-business',
        name: 'Small Businesses',
        revenue: '50L - 5Cr',
        employees: '10-50',
        focus: ['growth support', 'scalable structure', 'compliance automation'],
        pricing: 'value-oriented',
    },
    {
        id: 'enterprise',
        name: 'Enterprises',
        revenue: '> 5Cr',
        employees: '50+',
        focus: ['comprehensive compliance', 'multi-entity management', 'dedicated support'],
        pricing: 'premium',
    },
];

// Use case variations
export const useCaseVariations = [
    {
        id: 'new-business',
        name: 'New Business Setup',
        scenario: 'Starting a new business from scratch',
        painPoints: ['choosing right structure', 'understanding requirements', 'setup timeline'],
        solutions: ['structure consultation', 'complete checklist', 'fast-track processing'],
    },
    {
        id: 'expansion',
        name: 'Business Expansion',
        scenario: 'Expanding existing business to new cities/states',
        painPoints: ['multi-state compliance', 'branch setup', 'additional registrations'],
        solutions: ['multi-location support', 'state-specific guidance', 'centralized management'],
    },
    {
        id: 'compliance',
        name: 'Compliance Management',
        scenario: 'Maintaining ongoing compliance and filings',
        painPoints: ['deadline tracking', 'penalty avoidance', 'document management'],
        solutions: ['compliance calendar', 'automated reminders', 'document vault'],
    },
    {
        id: 'restructuring',
        name: 'Business Restructuring',
        scenario: 'Changing business structure or ownership',
        painPoints: ['conversion process', 'legal documentation', 'maintaining continuity'],
        solutions: ['conversion support', 'legal drafting', 'transition management'],
    },
];

/**
 * Generate variation metadata
 */
export function generateVariationData(baseService, variationType, variationConfig) {
    const variations = {
        industry: generateIndustryVariation,
        companySize: generateCompanySizeVariation,
        useCase: generateUseCaseVariation,
    };

    return variations[variationType](baseService, variationConfig);
}

/**
 * Industry-specific variation
 */
function generateIndustryVariation(baseService, industry) {
    const slug = `${baseService.slug}-for-${industry.id}`;

    return {
        id: slug,
        title: `${baseService.title} for ${industry.name}`,
        slug: slug,
        category: baseService.category,
        subCategory: `${industry.name} Services`,
        layoutVariant: baseService.layoutVariant,
        variationType: 'industry',
        variationId: industry.id,
        seo: {
            title: `${baseService.title} for ${industry.name} Business | LegalNest`,
            description: `Specialized ${baseService.title.toLowerCase()} services for ${industry.name.toLowerCase()} businesses. Expert guidance for ${industry.challenges[0]}.`,
            canonical: `/services/${slug}`,
        },
        content: {
            headline: `${baseService.title} for ${industry.name} Businesses`,
            subtext: `Streamlined ${baseService.title.toLowerCase()} designed specifically for ${industry.name.toLowerCase()} industry requirements.`,
            benefits: industry.benefits.map(benefit => ({
                title: benefit,
                description: `Specialized support for ${industry.name.toLowerCase()} businesses`
            })),
            challenges: industry.challenges,
            keywords: industry.keywords,
        }
    };
}

/**
 * Company size variation
 */
function generateCompanySizeVariation(baseService, companySize) {
    const slug = `${baseService.slug}-for-${companySize.id}`;

    return {
        id: slug,
        title: `${baseService.title} for ${companySize.name}`,
        slug: slug,
        category: baseService.category,
        subCategory: `${companySize.name} Services`,
        layoutVariant: baseService.layoutVariant,
        variationType: 'companySize',
        variationId: companySize.id,
        seo: {
            title: `${baseService.title} for ${companySize.name} | LegalNest`,
            description: `${companySize.pricing.charAt(0).toUpperCase() + companySize.pricing.slice(1)} ${baseService.title.toLowerCase()} packages for ${companySize.name.toLowerCase()}. ${companySize.focus[0]}.`,
            canonical: `/services/${slug}`,
        },
        content: {
            headline: `${baseService.title} for ${companySize.name}`,
            subtext: `Tailored ${baseService.title.toLowerCase()} solutions for businesses with ${companySize.employees} employees.`,
            focus: companySize.focus,
            pricing: companySize.pricing,
            revenue: companySize.revenue,
        }
    };
}

/**
 * Use case variation
 */
function generateUseCaseVariation(baseService, useCase) {
    const slug = `${baseService.slug}-${useCase.id}`;

    return {
        id: slug,
        title: `${baseService.title} - ${useCase.name}`,
        slug: slug,
        category: baseService.category,
        subCategory: `${useCase.name}`,
        layoutVariant: baseService.layoutVariant,
        variationType: 'useCase',
        variationId: useCase.id,
        seo: {
            title: `${baseService.title} for ${useCase.name} | LegalNest`,
            description: `${baseService.title} services for ${useCase.scenario.toLowerCase()}. ${useCase.solutions[0]}.`,
            canonical: `/services/${slug}`,
        },
        content: {
            headline: `${baseService.title} for ${useCase.name}`,
            subtext: useCase.scenario,
            painPoints: useCase.painPoints,
            solutions: useCase.solutions,
        }
    };
}

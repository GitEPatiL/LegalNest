import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    industryVariations,
    companySizeVariations,
    useCaseVariations,
    generateVariationData
} from '../src/lib/serviceVariations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVICES_PATH = path.resolve(__dirname, '../src/data/services.json');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/service-variations.json');
const MANIFEST_PATH = path.resolve(__dirname, '../output/variations-manifest.csv');

// Parse command line arguments
const args = process.argv.slice(2);
const flags = {
    type: args.includes('--type') ? args[args.indexOf('--type') + 1] : 'industry',
    services: args.includes('--services') ? args[args.indexOf('--services') + 1].split(',') : null,
    dryRun: args.includes('--dry-run'),
    limit: args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : null,
};

/**
 * Load existing services
 */
async function loadServices() {
    const content = await fs.readFile(SERVICES_PATH, 'utf-8');
    return JSON.parse(content);
}

/**
 * Generate variations based on type
 */
function generateVariations(services, type) {
    const variations = [];
    let templates = [];

    switch (type) {
        case 'industry':
            templates = industryVariations;
            break;
        case 'company-size':
            templates = companySizeVariations;
            break;
        case 'use-case':
            templates = useCaseVariations;
            break;
        case 'all':
            templates = [
                ...industryVariations.map(t => ({ ...t, type: 'industry' })),
                ...companySizeVariations.map(t => ({ ...t, type: 'company-size' })),
                ...useCaseVariations.map(t => ({ ...t, type: 'use-case' })),
            ];
            break;
        default:
            console.error(`Unknown type: ${type}`);
            return variations;
    }

    // Filter services if specified
    const servicesToProcess = flags.services
        ? services.filter(s => flags.services.includes(s.slug))
        : services;

    console.log(`\n📊 Generating variations for ${servicesToProcess.length} services...`);
    console.log(`   Template: ${type}`);
    console.log(`   Variations per service: ${templates.length}\n`);

    servicesToProcess.forEach(service => {
        templates.forEach(template => {
            const variationType = template.type || type;
            const variation = generateVariationData(service, variationType, template);
            variations.push(variation);
        });
    });

    // Apply limit if specified
    if (flags.limit) {
        return variations.slice(0, flags.limit);
    }

    return variations;
}

/**
 * Write variations to file
 */
async function writeVariations(variations) {
    if (flags.dryRun) {
        console.log('\n🔍 DRY RUN - No files will be written\n');
        console.log('Sample variations:');
        variations.slice(0, 3).forEach(v => {
            console.log(`  - ${v.title} (${v.slug})`);
        });
        return;
    }

    // Ensure output directory exists
    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });

    // Write variations JSON
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(variations, null, 2), 'utf-8');
    console.log(`✅ Variations written to: ${OUTPUT_PATH}`);

    // Write CSV manifest
    const csv = generateCSVManifest(variations);
    await fs.writeFile(MANIFEST_PATH, csv, 'utf-8');
    console.log(`✅ Manifest written to: ${MANIFEST_PATH}`);
}

/**
 * Generate CSV manifest
 */
function generateCSVManifest(variations) {
    const header = 'Slug,Title,Category,SubCategory,VariationType,VariationID,SEO Title,SEO Description\n';

    const rows = variations.map(v => {
        return [
            v.slug,
            `"${v.title}"`,
            v.category,
            v.subCategory,
            v.variationType,
            v.variationId,
            `"${v.seo.title}"`,
            `"${v.seo.description}"`,
        ].join(',');
    });

    return header + rows.join('\n');
}

/**
 * Print statistics
 */
function printStats(variations) {
    const byType = variations.reduce((acc, v) => {
        acc[v.variationType] = (acc[v.variationType] || 0) + 1;
        return acc;
    }, {});

    const byCategory = variations.reduce((acc, v) => {
        acc[v.category] = (acc[v.category] || 0) + 1;
        return acc;
    }, {});

    console.log('\n📈 Statistics:');
    console.log(`   Total variations: ${variations.length}`);
    console.log('\n   By Variation Type:');
    Object.entries(byType).forEach(([type, count]) => {
        console.log(`   - ${type}: ${count}`);
    });
    console.log('\n   By Service Category:');
    Object.entries(byCategory).forEach(([cat, count]) => {
        console.log(`   - ${cat}: ${count}`);
    });
}

/**
 * Main execution
 */
async function main() {
    console.log('🚀 Service Variation Generator\n');

    try {
        // Load base services
        const services = await loadServices();
        console.log(`✓ Loaded ${services.length} base services`);

        // Generate variations
        const variations = generateVariations(services, flags.type);

        // Print statistics
        printStats(variations);

        // Write output
        await writeVariations(variations);

        console.log('\n✅ Generation complete!\n');

        // Show sample URLs
        if (!flags.dryRun) {
            console.log('📋 Sample variation URLs:');
            variations.slice(0, 5).forEach(v => {
                console.log(`   ${v.seo.canonical}`);
            });
            console.log(`   ... and ${variations.length - 5} more\n`);
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

// Show usage if --help
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Service Variation Generator

Usage:
  node scripts/generateVariations.js [options]

Options:
  --type <type>         Variation type: industry, company-size, use-case, all (default: industry)
  --services <slugs>    Comma-separated list of service slugs to process (default: all)
  --limit <number>      Maximum number of variations to generate
  --dry-run            Show what would be generated without writing files
  --help, -h           Show this help message

Examples:
  # Generate industry variations for all services
  node scripts/generateVariations.js --type industry

  # Generate company-size variations for specific services
  node scripts/generateVariations.js --type company-size --services gst-registration,trademark-registration

  # Preview first 10 variations
  node scripts/generateVariations.js --type all --limit 10 --dry-run

  # Generate all types for all services
  node scripts/generateVariations.js --type all

Output:
  - src/data/service-variations.json - Full variation data
  - output/variations-manifest.csv - CSV manifest for review
  `);
    process.exit(0);
}

main();

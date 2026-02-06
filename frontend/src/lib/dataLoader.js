import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

/**
 * Load all services from services.json
 */
export async function getAllServices() {
    const filePath = path.join(DATA_DIR, 'services.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug) {
    const services = await getAllServices();
    return services.find(service => service.slug === slug);
}

/**
 * Get all service slugs for static generation
 */
export async function getAllServiceSlugs() {
    const services = await getAllServices();
    return services.map(service => service.slug);
}

/**
 * Load menu data
 */
export async function getMenuData() {
    const filePath = path.join(DATA_DIR, 'menu.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

/**
 * Load cities data
 */
export async function getCities() {
    const filePath = path.join(DATA_DIR, 'cities.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

/**
 * Load blog posts
 */
export async function getBlogPosts() {
    const filePath = path.join(DATA_DIR, 'blog.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

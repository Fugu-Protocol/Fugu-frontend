// Utility functions for markets

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();
}

/**
 * Find a market by its slug
 */
export function findMarketBySlug<T extends { slug?: string; question?: string }>(
    markets: T[],
    slug: string
): T | undefined {
    return markets.find((market) => {
        // Check if market has a slug property
        if ('slug' in market && market.slug) {
            return market.slug === slug;
        }
        // Fallback: generate slug from question
        if ('question' in market && market.question) {
            return generateSlug(market.question) === slug;
        }
        return false;
    });
}

import { WPPost, WPCategory } from '../types';

const BASE_URL = "https://visitmoroccotoday.com/wp-json/wp/v2";

// Helper to handle errors gracefully
const safeFetch = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("WP API Fetch Error:", error);
    return null;
  }
};

export const fetchPosts = async (page: number = 1, perPage: number = 10, search?: string, category?: number): Promise<WPPost[]> => {
  let url = `${BASE_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (category) {
    url += `&categories=${category}`;
  }

  const data = await safeFetch(url);
  return data || [];
};

export const fetchPostBySlug = async (slug: string): Promise<WPPost | null> => {
  const data = await safeFetch(`${BASE_URL}/posts?_embed&slug=${slug}`);
  return data && data.length > 0 ? data[0] : null;
};

export const fetchCategories = async (): Promise<WPCategory[]> => {
  const data = await safeFetch(`${BASE_URL}/categories?hide_empty=true&per_page=20`);
  return data || [];
};

// Mocks for when the live API might fail due to CORS in strict browser environments or if the site is down
export const getMockPosts = (): WPPost[] => {
  return Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    date: new Date().toISOString(),
    slug: `demo-post-${i}`,
    title: { rendered: `Magic of Morocco: Destination ${i + 1}` },
    excerpt: { rendered: "Experience the vibrant colors, rich history, and unforgettable landscapes of Morocco in this exclusive guide." },
    content: { rendered: "<p>Full content would appear here fetched from the WordPress API.</p>" },
    _embedded: {
      'wp:featuredmedia': [{
        source_url: `https://picsum.photos/800/600?random=${i}`,
        alt_text: "Moroccan landscape"
      }],
      author: [{ name: "Visit Morocco Team" }]
    }
  }));
};

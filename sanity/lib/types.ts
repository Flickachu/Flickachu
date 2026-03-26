export interface SanityImage {
  asset: { _ref: string };
  alt?: string;
  caption?: string;
}

export interface SanityAuthor {
  name: string;
  image?: SanityImage;
  bio?: unknown[];
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  category: "Article" | "Guide";
  excerpt?: string;
  readTime?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  author?: SanityAuthor;
  body?: unknown[];
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  hero?: SanityImage;
  category: "Case Study";
  location?: string;
  scope?: string;
  area?: string;
  timeline?: string;
  challenge?: string;
  solution?: string;
  gallery?: SanityImage[];
  highlights?: { title: string; text: string }[];
  publishedAt?: string;
  // Aliases used in some queries
  excerpt?: string;
  mainImage?: SanityImage;
}

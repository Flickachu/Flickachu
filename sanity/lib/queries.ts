import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  excerpt,
  readTime,
  publishedAt,
  mainImage,
  author-> {
    name,
    image
  }
}`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  description,
  location,
  hero,
  publishedAt
}`);

export const ALL_INSIGHTS_QUERY = defineQuery(`{
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    readTime,
    publishedAt,
    mainImage
  },
  "projects": *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    "excerpt": description,
    publishedAt,
    "mainImage": hero
  }
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  publishedAt,
  mainImage,
  body,
  author-> {
    name,
    image,
    bio
  }
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  description,
  location,
  scope,
  area,
  timeline,
  challenge,
  solution,
  hero,
  gallery,
  highlights,
  publishedAt
}`);

export const PAGE_QUERY = `*[_type == "page" && slug.current == "home"][0]{
  title,
  "sections": coalesce(sections, [])[]{
    _type,
    ...,
    _type == "productGrid" => {
      "products": coalesce(products[]->{
        title,
        "imageUrl": image.asset->url,
        slug
      }, [])
    },
    _type == "featuredProjectSection" => {
      "project": project->{
        title,
        slug,
        description,
        hero
      }
    }
  }
}`;

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

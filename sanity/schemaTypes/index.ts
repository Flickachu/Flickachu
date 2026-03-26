import { type SchemaTypeDefinition } from 'sanity'

import { author } from './author'
import { post } from './post'
import { blockContent } from './blockContent'
import { project } from './project'
import { page } from './page'
import { hero } from './hero'
import { featureSection } from './featureSection'
import { product } from './product'
import { productGrid } from './productGrid'
import { editorialSection } from './editorialSection'
import { aboutSection } from './aboutSection'
import { statsSection } from './statsSection'
import { highlightSection } from './highlightSection'
import { featuredProjectSection } from './featuredProjectSection'
import { processSection } from './processSection'
import { materialsSection } from './materialsSection'
import { marqueeSection } from './marqueeSection'
import { insightsSection } from './insightsSection'
import { testimonialsSection } from './testimonialsSection'
import { ctaSection } from './ctaSection'
import { navItem } from './navItem'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    author,
    post,
    blockContent,
    project,
    page,
    hero,
    featureSection,
    product,
    productGrid,
    editorialSection,
    aboutSection,
    statsSection,
    highlightSection,
    featuredProjectSection,
    processSection,
    materialsSection,
    marqueeSection,
    insightsSection,
    testimonialsSection,
    ctaSection,
    navItem,
    siteSettings,
  ],
}

import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'editorialSection' },
        { type: 'aboutSection' },
        { type: 'statsSection' },
        { type: 'highlightSection' },
        { type: 'featureSection' },
        { type: 'productGrid' },
        { type: 'featuredProjectSection' },
        { type: 'processSection' },
        { type: 'materialsSection' },
        { type: 'marqueeSection' },
        { type: 'insightsSection' },
        { type: 'testimonialsSection' },
        { type: 'ctaSection' },
      ],
    }),
  ],
});

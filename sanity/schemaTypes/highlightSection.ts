import { defineType, defineField } from 'sanity';

export const highlightSection = defineType({
  name: 'highlightSection',
  title: 'Highlight Project Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag (e.g. Spatial Study)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});

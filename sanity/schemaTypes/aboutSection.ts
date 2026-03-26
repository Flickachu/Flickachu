import { defineType, defineField } from 'sanity';

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlighted Text',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
  ],
});

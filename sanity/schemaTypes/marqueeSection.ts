import { defineType, defineField } from 'sanity';

export const marqueeSection = defineType({
  name: 'marqueeSection',
  title: 'Marquee / Partners Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      title: 'Logos (URLs for now)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

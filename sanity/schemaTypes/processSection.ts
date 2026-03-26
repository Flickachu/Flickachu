import { defineType, defineField } from 'sanity';

export const processSection = defineType({
  name: 'processSection',
  title: 'Process Section (Stacking Cards)',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
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
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'phase', title: 'Phase Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image' },
            { name: 'bgColor', title: 'Background Color Class', type: 'string' },
          ],
        },
      ],
    }),
  ],
});

import { defineType, defineField } from 'sanity';

export const materialsSection = defineType({
  name: 'materialsSection',
  title: 'Materials Section (Horizontal Scroll)',
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
      name: 'materials',
      title: 'Materials Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'images', title: 'Images', type: 'array', of: [{ type: 'image' }] },
          ],
        },
      ],
    }),
  ],
});

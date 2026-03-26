import { defineType, defineField } from 'sanity';

export const editorialSection = defineType({
  name: 'editorialSection',
  title: 'Editorial Section',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
});

import { defineType, defineField } from 'sanity';

export const insightsSection = defineType({
  name: 'insightsSection',
  title: 'Insights / Blog Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
});

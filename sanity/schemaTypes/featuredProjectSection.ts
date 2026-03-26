import { defineType, defineField } from 'sanity';

export const featuredProjectSection = defineType({
  name: 'featuredProjectSection',
  title: 'Featured Project Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag (e.g. Featured Project)',
      type: 'string',
    }),
    defineField({
      name: 'project',
      title: 'Featured Project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
  ],
});

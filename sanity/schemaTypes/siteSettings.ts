import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      description: 'Links in the top header',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Navbar CTA Button',
      type: 'navItem',
    }),
    defineField({
      name: 'studioLinks',
      title: 'Footer Studio Links',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
    defineField({
      name: 'connectLinks',
      title: 'Footer Connect Links',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})

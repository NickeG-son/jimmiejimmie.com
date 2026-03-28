import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Information Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Om mig" or "Priser"',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title', // If he types "Om mig", it auto-generates "/om-mig"!
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'This uniquely defines the URL of the page.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Header Image (Optional)',
      type: 'image',
      options: {
        hotspot: true, // Let him crop the face!
      },
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      // By putting 'block' here, Sanity instantly gives him a huge rich-text editor 
      // with B, I, U, Lists, H1, H2, Quotes! He can even inject images between paragraphs.
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
})

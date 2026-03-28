import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'galleryImage',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true, // Allows him to crop/focus the image in the admin panel!
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }], // This links it to the Category schema!
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'cameraSettings',
            title: 'Camera Settings (Optional)',
            type: 'string',
            description: 'e.g., ISO 100, f/1.8, 1/200s',
        }),
    ],
})

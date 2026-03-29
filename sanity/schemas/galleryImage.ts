import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Fotografier",
  type: "document",
  fieldsets: [
    {
      name: "cameraSettings",
      title: "Camera Settings",
      description: "e.g., ISO 100, f/1.8, 1/200s",
      options: {
        collapsible: true, // Gör att man kan fälla ihop rubriken
        collapsed: false, // Den är öppen som standard
      },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Allows him to crop/focus the image in the admin panel!
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }], // This links it to the Category schema!
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "productInfo",
      title: "Product Info",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "iso",
      title: "ISO",
      type: "number",
      fieldset: "cameraSettings", // Samma namn som i fieldsets ovan
    }),
    defineField({
      name: "aperture",
      title: "Aperture",
      type: "string",
      fieldset: "cameraSettings",
    }),
    defineField({
      name: "shutterSpeed",
      title: "Shutter Speed",
      type: "string",
      fieldset: "cameraSettings",
    }),
  ],
});

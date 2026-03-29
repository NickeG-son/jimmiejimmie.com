import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Startsida",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Linked Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
      description:
        "Pick a category — the title and description will be shown automatically.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description:
        "Full-screen image for this slide. Best in landscape / wide format.",
    }),
    defineField({
      name: "buttonText",
      title: "Knapp text",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Text on the button.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number = appears first. e.g., 1, 2, 3...",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "category.title",
      media: "heroImage",
      order: "order",
    },
    prepare({ title, media, order }) {
      return {
        title: `${order}. ${title ?? "No category selected"}`,
        media,
      };
    },
  },
});

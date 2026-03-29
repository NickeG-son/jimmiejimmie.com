import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Sidor",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Om mig" or "Priser"',
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title", // If he types "Om mig", it auto-generates "/om-mig"!
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "This uniquely defines the URL of the page.",
    }),
    defineField({
      name: "mainImage",
      title: "Header Image (Optional)",
      type: "image",
      options: {
        hotspot: true, // Let him crop the face!
      },
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      // By putting 'block' here, Sanity instantly gives him a huge rich-text editor
      // with B, I, U, Lists, H1, H2, Quotes! He can even inject images between paragraphs.
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Sociala Medier",
      type: "array",
      description: "Lägg till sociala medier-konton. Varje länk visas med rätt ikon på kontaktsidan.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description: "Välj vilken plattform det är — ikonen väljs automatiskt.",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Vimeo", value: "vimeo" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "Annan länk", value: "link" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Länk (URL)",
              type: "url",
              validation: (Rule) => Rule.required(),
              description: "e.g., https://www.instagram.com/jimmiefoto",
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
  ],
});

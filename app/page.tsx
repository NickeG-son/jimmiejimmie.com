import { client, urlFor } from "@/sanity/client";
import HeroSection from "@/components/sections/hero";

export default async function Startpage() {
  const rawSlides = await client.fetch(`
    *[_type == "heroSlide"] | order(order asc) {
      _id,
      heroImage,
      buttonText,
      "category": category->{
        title,
        "slug": slug.current,
        description,
      }
    }
  `);

  // Build full image URLs on the server before passing to client component
  const slides = rawSlides
    .filter((s: any) => s.heroImage && s.category)
    .map((s: any) => ({
      _id: s._id,
      heroImage: urlFor(s.heroImage).width(1920).height(1080).url(),
      category: s.category,
      buttonText: s.buttonText,
    }));

  return <HeroSection slides={slides} />;
}

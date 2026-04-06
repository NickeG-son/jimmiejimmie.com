import GalleryCarousel from "@/components/gallery-carousel";
import { client, urlFor } from "@/sanity/client";

export default async function GalleriRootPage() {
  // Fetch all categories that have a cover image!
  const categories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      "slug": slug.current,
      description,
      mainImage
    }
  `);

  return (
    <div className="w-full py-24">
      <h1 className="mb-4 text-center text-2xl font-bold tracking-widest uppercase lg:text-5xl">
        Portfolios
      </h1>

      <GalleryCarousel items={categories} slugPrefix="/galleri" />
    </div>
  );
}

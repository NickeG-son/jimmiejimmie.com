import { client, urlFor } from "../../../sanity/client";
import Image from "next/image";
import Link from "next/link";

export default async function GalleryCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  // 1. Fetch all Gallery Images from Sanity where the Category Slug matches our URL!
  // "GROQ" query language: "Get everything of type galleryImage, but only if the category matches!"
  const images = await client.fetch(
    `*[_type == "galleryImage" && category->slug.current == $category]{
      _id,
      title,
      "slug": slug.current,
      image,
    }`,
    { category },
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-widest uppercase">{category}</h1>

      {/* A nice CSS Grid layout for the thumbnails */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((photo: any) => (
          <Link
            key={photo._id}
            // Navigate to the detail page:
            href={`/gallery/${category}/${photo.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-gray-100"
          >
            <Image
              // Generate the ultra-fast Next.js image URL from Sanity:
              src={urlFor(photo.image).width(800).height(1000).url()}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              // THIS IS THE VIEW TRANSITION MAGIC!
              // We tag this image so the browser remembers it when moving to the next page!
              style={{ viewTransitionName: `photo-${photo.slug}` }}
            />
            {/* A subtle dark overlay on hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </Link>
        ))}
      </div>

      {images.length === 0 && <p className="mt-20 text-center text-gray-500">No photos in this category yet!</p>}
    </div>
  );
}

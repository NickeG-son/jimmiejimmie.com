import { client, urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";

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
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-12 text-center text-4xl font-bold tracking-widest uppercase md:text-5xl">Portfolios</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: any) => (
          <Link
            key={category._id}
            href={`/galleri/${category.slug}`}
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-gray-900"
          >
            {/* The Cover Image */}
            {category.mainImage ? (
              <Image
                src={urlFor(category.mainImage).width(800).height(450).url()}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
              />
            ) : (
              // Fallback if he forgot to upload a cover image
              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-zinc-800">
                <span className="text-gray-400">No Image</span>
              </div>
            )}

            {/* The Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h2 className="mb-2 text-2xl font-bold tracking-widest uppercase">{category.title}</h2>
              {category.description && <p className="line-clamp-2 text-sm text-gray-200">{category.description}</p>}
            </div>

            {/* Permanent Bottom Title if you don't hover */}
            <div className="absolute bottom-6 left-6 transition-opacity duration-500 group-hover:opacity-0">
              <h2 className="text-xl font-bold tracking-widest text-white uppercase drop-shadow-md">
                {category.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

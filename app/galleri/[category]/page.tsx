import { client } from "../../../sanity/client";
import ClientContent from "./client-content";

const ALL_IMAGES_SLUG = "alla-bilder";

export default async function GalleryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const isAllImages = category === ALL_IMAGES_SLUG;

  // When visiting "alla-bilder" we skip the category filter and return everything.
  const images = await client.fetch(
    isAllImages
      ? `*[_type == "galleryImage"] | order(_createdAt desc) {
          _id,
          title,
          "slug": slug.current,
          "mainImage": image,
          description,
          iso,
          aperture,
          shutterSpeed,
        }`
      : `*[_type == "galleryImage" && category->slug.current == $category]{
          _id,
          title,
          "slug": slug.current,
          "mainImage": image,
          description,
          iso,
          aperture,
          shutterSpeed,
        }`,
    isAllImages ? {} : { category },
  );

  return <ClientContent images={images} category={category} />;
}


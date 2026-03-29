import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { client, urlFor } from "../../../sanity/client";
import Image from "next/image";
import Link from "next/link";
import GalleryCarousel from "@/components/gallery-carousel";
import ClientContent from "./client-content";

export default async function GalleryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 1. Fetch all Gallery Images from Sanity where the Category Slug matches our URL!
  // "GROQ" query language: "Get everything of type galleryImage, but only if the category matches!"
  const images = await client.fetch(
    `*[_type == "galleryImage" && category->slug.current == $category]{
      _id,
      title,
      "slug": slug.current,
      "mainImage": image,
      description,
      iso,
      aperture,
      shutterSpeed,
    }`,
    { category },
  );

  return <ClientContent images={images} category={category} />;
}

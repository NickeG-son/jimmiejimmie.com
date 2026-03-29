"use client";

import { urlFor } from "@/sanity/client";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export function PhotoDetailImage({
  photo,
  photoId,
}: {
  photo: any;
  photoId: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("detailed", photoId);
  return (
    <motion.div
      layout
      layoutId={`photo-${photoId}`}
      className="h-dvh w-full overflow-hidden"
    >
      <Image
        src={urlFor(photo.mainImage).url()}
        alt={photo.title || "Photography"}
        fill
        priority
        className="object-cover"
      />
    </motion.div>
  );
}

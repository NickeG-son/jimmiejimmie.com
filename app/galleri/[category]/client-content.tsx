"use client";

import GalleryCarousel from "@/components/gallery-carousel";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { urlFor } from "@/sanity/client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GalleryImage } from "@/lib/types";
import {
  Aperture,
  ApertureIcon,
  Camera,
  CameraIcon,
  Timer,
} from "lucide-react";
import Link from "next/link";

export default function ClientContent({
  images,
  category,
}: {
  images: GalleryImage[];
  category: string;
}) {
  const [detaildId, setDetaildId] = useState<string | null>(null);
  const detaildPhoto = images.find((image) => image.slug === detaildId);
  /*   if (detaildId) {
    return (
      <motion.div
        layout
        layoutId={`photo-${detaildId}`}
        className="h-dvh w-full overflow-hidden"
      >
        <div className="absolute top-28 left-8 z-10 rounded-3xl bg-black/20 p-4 backdrop-blur-md">
          <Button
            variant="link"
            onClick={() => setDetaildId(null)}
            className="text-muted-foreground hover:text-primary text-sm tracking-widest uppercase transition-colors"
          >
            ← Tillbaka till {category}
          </Button>
        </div>

        <Image
          src={urlFor(detaildPhoto.mainImage).url()}
          alt={detaildPhoto.title || "Photography"}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute top-28 right-8 bottom-24 flex flex-col rounded-3xl bg-black/20 p-8 backdrop-blur-md">
          <h1 className="mt-8 text-4xl font-bold tracking-widest uppercase md:text-6xl">
            {detaildPhoto.title || detaildPhoto.slug}
          </h1>

          {detaildPhoto.description && (
            <p className="text-muted-foreground mt-4 max-w-2xl">
              {detaildPhoto.description}
            </p>
          )}
        </div>
      </motion.div>
    );
  } */
  return (
    <div className={cn("", detaildId ? "" : "h-full w-full px-4 py-24")}>
      {!detaildId ? (
        <>
          <h1 className="mb-8 text-center text-4xl font-bold tracking-widest uppercase">
            {category}
          </h1>
          <div className="absolute top-28 left-8 z-10 rounded-full bg-black/20 px-4 py-3 backdrop-blur-md">
            <Link
              href="/galleri"
              className="text-muted-foreground hover:text-primary text-sm tracking-widest uppercase transition-colors"
            >
              ← Tillbaka till Galleri
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-28 left-8 z-10 rounded-full bg-black/20 px-4 py-3 backdrop-blur-md">
            <Button
              variant="link"
              onClick={() => setDetaildId(null)}
              className="text-muted-foreground hover:text-primary text-sm tracking-widest uppercase transition-colors"
            >
              ← Tillbaka till {category}
            </Button>
          </div>
          <AnimatePresence>
            {detaildPhoto && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ delay: 0.2 }}
                className="absolute top-28 right-8 bottom-8 z-10 flex flex-col rounded-3xl bg-black/20 p-8 backdrop-blur-md"
              >
                <h1 className="mt-8 text-4xl font-bold tracking-widest uppercase md:text-6xl">
                  {detaildPhoto?.title || detaildPhoto?.slug}
                </h1>

                {detaildPhoto?.description && (
                  <p className="text-muted-foreground mt-4 max-w-2xl">
                    {detaildPhoto.description}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {detaildPhoto && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-4 rounded-full bg-black/20 px-8 py-3 backdrop-blur-md"
                >
                  {detaildPhoto?.iso && (
                    <p className="text-muted-foreground flex max-w-2xl items-center gap-2">
                      <Camera className="size-5" />
                      {detaildPhoto.iso}
                    </p>
                  )}
                  {detaildPhoto?.aperture && (
                    <p className="text-muted-foreground flex max-w-2xl items-center gap-2">
                      <Aperture className="size-5" />
                      {detaildPhoto.aperture}
                    </p>
                  )}

                  {detaildPhoto?.shutterSpeed && (
                    <p className="text-muted-foreground flex max-w-2xl items-center gap-2">
                      <Timer className="size-5" />
                      {detaildPhoto.shutterSpeed}
                    </p>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      <GalleryCarousel
        items={images}
        slugPrefix={`/galleri/${category}`}
        setDetaildId={setDetaildId}
        detaildId={detaildId}
      />
    </div>
  );
}

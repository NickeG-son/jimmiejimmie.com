"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function GalleryCarousel({
  items,
  slugPrefix,
  detaildId,
  setDetaildId,
}: {
  items: any[];
  slugPrefix: string;
  detaildId: string | null;
  setDetaildId: (id: string) => void;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);

    api.on("select", () => {
      // Do something on select.
    });
    api.on("scroll", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",

        slidesToScroll: 1,
        containScroll: false,
      }}
    >
      <CarouselContent className={cn("", detaildId ? "!transform-none" : "")}>
        {items.map((item: any, index: number) => (
          <CarouselItem
            index={index}
            data-active-slide={index + 1 === current}
            key={item._id}
            className={cn(
              "min-h-[calc(100dvh-280px)] basis-1/3 duration-300",
              index + 1 === current ? "basis-2/4" : "basis-1/4",
            )}
          >
            <motion.button
              onClick={() => setDetaildId(item.slug)}
              layout
              style={{
                height: detaildId === item.slug ? "100dvh" : "100%",
                width: detaildId === item.slug ? "100vw" : "100%",
                borderRadius: detaildId === item.slug ? "0" : "1rem",
                zIndex: detaildId === item.slug ? 5 : 0,
                position: detaildId === item.slug ? "fixed" : "relative",
                top: detaildId === item.slug ? "0" : "auto",
                left: detaildId === item.slug ? "0" : "auto",
                right: detaildId === item.slug ? "0" : "auto",
                bottom: detaildId === item.slug ? "0" : "auto",
              }}
              className={cn(
                "group relative block aspect-video h-full w-full cursor-pointer overflow-hidden",
              )}
            >
              {/* The Cover Image */}
              {item.mainImage ? (
                <Image
                  src={urlFor(item.mainImage).width(800).height(450).url()}
                  alt={item.title}
                  fill
                  className={cn(
                    "object-cover",
                    detaildId
                      ? ""
                      : "transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60",
                  )}
                />
              ) : (
                // Fallback if he forgot to upload a cover image
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              {/* The Text Overlay */}
              {!detaildId && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <h2 className="mb-2 text-2xl font-bold tracking-widest uppercase">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="line-clamp-2 text-sm text-gray-200">
                      {item.description}
                    </p>
                  )}
                </div>
              )}

              {/* Permanent Bottom Title if you don't hover */}
              {!detaildId && (
                <div className="absolute bottom-6 left-6 transition-opacity duration-500 group-hover:opacity-0">
                  <h2 className="text-xl font-bold tracking-widest text-white uppercase drop-shadow-md">
                    {item.title}
                  </h2>
                </div>
              )}
            </motion.button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <AnimatePresence>
        {!detaildId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 flex items-center justify-center gap-4"
          >
            <CarouselPrevious className="" absolute={false} />
            <CarouselDots />
            <CarouselNext absolute={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </Carousel>
  );
}

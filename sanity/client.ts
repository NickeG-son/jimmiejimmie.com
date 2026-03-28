import { createClient } from "next-sanity";
// Change this line:
import createImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "gr97dtx7", 
  dataset: "production",
  apiVersion: "2024-03-28", 
  useCdn: false,
});

// And change this line:
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

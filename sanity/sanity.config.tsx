import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import category from "./schemas/category";
import galleryImage from "./schemas/galleryImage";
import { User } from "lucide-react";
import menuItems from "./schemas/menuItems";
import page from "./schemas/page";
import contactSubmission from "./schemas/contactSubmission";

function InloggLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
      <User size={24} />
      Svensson 4x4
    </div>
  );
}

export default defineConfig({
  basePath: "/studio", // <-- The URL path where your friend will go to log in!
  projectId: "gr97dtx7", //  <-- Replace this!
  dataset: "production",
  name: "Svensson4x4",
  title: "Svensson4x4",
  // We will plug our 'schemas' in here on the next step:
  studio: {
    components: {
      logo: InloggLogo,
    },
  },
  schema: {
    types: [category, galleryImage, menuItems, page, contactSubmission],
  },
  plugins: [structureTool()],
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import category from "./schemas/category";
import galleryImage from "./schemas/galleryImage";
import { User } from "lucide-react";
import menuItems from "./schemas/menuItems";
import page from "./schemas/page";
import contactSubmission from "./schemas/contactSubmission";
import heroSlide from "./schemas/heroSlide";

function InloggLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
      <User size={24} />
      JimmieJimmie.com
    </div>
  );
}

export default defineConfig({
  basePath: "/studio", // <-- The URL path where your friend will go to log in!
  projectId: "gr97dtx7", //  <-- Replace this!
  dataset: "production",
  name: "jimmiejimmie",
  title: "JimmieJimmie.com",
  // We will plug our 'schemas' in here on the next step:
  studio: {
    components: {
      logo: InloggLogo,
    },
  },
  schema: {
    types: [category, galleryImage, menuItems, page, contactSubmission, heroSlide],
  },
  plugins: [structureTool()],
});

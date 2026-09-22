import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "xamonx bypass link",
    short_name: "xamonx",
    description: "Tempel shortlink. AI akan menangani sisanya.",
    start_url: "/",
    display: "standalone",
    background_color: "#05050d",
    theme_color: "#05050d",
    icons: [{ src: "/icon.png", sizes: "500x500", type: "image/png", purpose: "any" }],
  };
}

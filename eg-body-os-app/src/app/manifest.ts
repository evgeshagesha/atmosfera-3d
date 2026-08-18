import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Атмосфера 3D",
    short_name: "Атмосфера 3D",
    description: "EG BODY OS · клиентский бренд Атмосфера 3D",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0C0E",
    theme_color: "#0B0C0E",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

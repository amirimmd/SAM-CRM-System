import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samlogistics.com";
  const routes = [
    "",
    "/services",
    "/pricing",
    "/calculator",
    "/request",
    "/tracking",
    "/updates",
    "/brands",
    "/blog",
    "/about",
    "/landing",
    "/contact",
    "/dashboard",
    "/shipments",
    "/orders",
    "/messages",
    "/documents",
    "/settings",
    "/admin",
  ];

  return SUPPORTED_LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );
}

// app/(public)/catalog/page.tsx — All products catalog & storefront
import type { Metadata } from "next";
import { getProducts } from "@/lib/products.api";
import MobileStorefront from "@/components/catalog/MobileStorefront";

export const metadata: Metadata = {
  title: "All Products | CRRDC — CLSU",
  description: "Browse CRRDC's full catalog of certified seeds, rice, seedlings, and agricultural inputs developed and distributed by CLSU.",
};

export const revalidate = 3600;

export default async function CatalogPage() {
  const products = await getProducts();

  return <MobileStorefront initialProducts={products} />;
}

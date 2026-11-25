// app/(public)/page.tsx — Products Storefront (Main Landing Page)
import type { Metadata } from "next";
import { getProducts } from "@/lib/products.api";
import MobileStorefront from "@/components/catalog/MobileStorefront";

export const metadata: Metadata = {
  title: "All Products | CRRDC — CLSU Agricultural Products",
  description: "Browse CRRDC's full catalog of certified seeds, quality rice, vigorous seedlings, and agricultural inputs developed and tested by CLSU.",
};

export const revalidate = 3600;

export default async function HomePage() {
  const products = await getProducts();

  return <MobileStorefront initialProducts={products} />;
}

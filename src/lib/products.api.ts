// lib/products.api.ts — Product data access layer (server + client)
import type { Product, ProductCategory } from "@/types";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "NSIC Rc 222 Palay Seeds",
    description: "Certified inbred palay seeds of NSIC Rc 222 developed by CLSU researchers. High-yielding, sturdy stalks, superior grain quality.",
    specification: "Certified seed · 20 kg bag",
    category: "seed",
    unit_type: "sack",
    price_php: 1450.00,
    sack_price_php: 1450.00,
    stock_qty: 120,
    low_stock_threshold: 20,
    image_url: "/images/products/palay-seeds.jpg",
    is_active: true,
    is_popular: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "CLSU Premium Milled Rice",
    description: "Well-milled high quality white rice grown and freshly milled at CLSU CRRDC. Fragrant, tender, and soft textured.",
    specification: "Well-milled · 5 kg pack",
    category: "rice",
    unit_type: "packet",
    price_php: 285.00,
    sack_price_php: null,
    stock_qty: 8,
    low_stock_threshold: 15,
    image_url: "/images/products/milled-rice.jpg",
    is_active: true,
    is_popular: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Eggplant Seedlings",
    description: "Vigorous, pest-resistant eggplant seedlings in plug trays ready for field transplanting. Developed for high fruit yield.",
    specification: "Tray of 50 · ready to plant",
    category: "seedling",
    unit_type: "unit",
    price_php: 350.00,
    sack_price_php: null,
    stock_qty: 45,
    low_stock_threshold: 10,
    image_url: "/images/products/eggplant-seedlings.jpg",
    is_active: true,
    is_popular: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "Black Pigmented Rice",
    description: "Nutritious heirloom black rice rich in anthocyanins and natural antioxidants. Cultivated and curated by CRRDC research.",
    specification: "Antioxidant-rich · 2 kg",
    category: "rice",
    unit_type: "packet",
    price_php: 240.00,
    sack_price_php: null,
    stock_qty: 0,
    low_stock_threshold: 10,
    image_url: "/images/products/black-rice.jpg",
    is_active: true,
    is_popular: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    name: "Mung Bean Seeds",
    description: "Certified Pag-asa mung bean seeds. High germination rate, drought-tolerant, nitrogen-fixing legume for crop rotation.",
    specification: "Certified seed · 1 kg pack",
    category: "seed",
    unit_type: "packet",
    price_php: 120.00,
    sack_price_php: null,
    stock_qty: 210,
    low_stock_threshold: 25,
    image_url: "/images/products/mung-beans.jpg",
    is_active: true,
    is_popular: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    name: "Tomato Seedlings",
    description: "Hardy hybrid tomato seedlings in 50-cell plug nursery trays. Strong root systems with early flowering potential.",
    specification: "Tray of 50 · ready to plant",
    category: "seedling",
    unit_type: "unit",
    price_php: 330.00,
    sack_price_php: null,
    stock_qty: 60,
    low_stock_threshold: 15,
    image_url: "/images/products/tomato-seedlings.jpg",
    is_active: true,
    is_popular: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "77777777-7777-7777-7777-777777777777",
    name: "Sweet Corn Hybrid Seeds",
    description: "Premium sweet corn hybrid seeds with high sugar conversion and excellent ear filling. Suitable for wet and dry seasons.",
    specification: "Hybrid seed · 1 kg pack",
    category: "seed",
    unit_type: "packet",
    price_php: 250.00,
    sack_price_php: null,
    stock_qty: 80,
    low_stock_threshold: 15,
    image_url: "/images/products/sweet-corn.jpg",
    is_active: true,
    is_popular: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "88888888-8888-8888-8888-888888888888",
    name: "Vermicompost Soil Conditioner",
    description: "100% pure organic vermicompost manufactured by CRRDC vermiculture unit. Enriches soil microbes and root aeration.",
    specification: "Organic input · 5 kg bag",
    category: "other",
    unit_type: "unit",
    price_php: 95.00,
    sack_price_php: null,
    stock_qty: 50,
    low_stock_threshold: 10,
    image_url: "/images/products/vermicompost.jpg",
    is_active: true,
    is_popular: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function isRealSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  return url.length > 0 && !url.includes("your-project.supabase.co");
}

// Server-side: fetch products directly from Supabase with graceful fallback
export async function getProducts(
  category?: ProductCategory
): Promise<Product[]> {
  if (!isRealSupabaseConfigured()) {
    return category
      ? FALLBACK_PRODUCTS.filter((p) => p.category === category)
      : FALLBACK_PRODUCTS;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    let query = supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return category
        ? FALLBACK_PRODUCTS.filter((p) => p.category === category)
        : FALLBACK_PRODUCTS;
    }
    return data as Product[];
  } catch {
    return category
      ? FALLBACK_PRODUCTS.filter((p) => p.category === category)
      : FALLBACK_PRODUCTS;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isRealSupabaseConfigured()) {
    return FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
    }
    return data as Product;
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.id === id) || null;
  }
}

// Admin: get all products including inactive
export async function getAllProductsAdmin(): Promise<Product[]> {
  if (!isRealSupabaseConfigured()) {
    return FALLBACK_PRODUCTS;
  }

  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) return FALLBACK_PRODUCTS;
    return data as Product[];
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

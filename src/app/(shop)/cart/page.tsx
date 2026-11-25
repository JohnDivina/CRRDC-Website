// app/(public)/cart/page.tsx — Redirect legacy cart route to the integrated store modal
import { redirect } from "next/navigation";

export default function CartPage() {
  redirect("/?openCart=true");
}

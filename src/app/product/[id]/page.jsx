import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { cacheLife } from "next/cache";

export default async function ProductPage({ params }) {
    "use cache" ; 
    cacheLife("minutes")
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) notFound();

  const product = await res.json();

  return <ProductDetails product={product} />;
}
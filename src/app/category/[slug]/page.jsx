import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryProducts from "@/components/CategoryProducts";



const toBn = (num) => Number(num).toLocaleString("bn-BD");

const CategoryContent = async ({ params }) => {
  const { slug } = await params;

  // category info ar oi category r product, duto ekshathe fetch
  const [catRes, prodRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`),
  ]);

  const categories = await catRes.json();
  const products = await prodRes.json();

  // response er shape alada hote pare, tai duto-i handle korlam
  const categoryList = Array.isArray(categories)
    ? categories
    : categories.data || [];
  const productList = Array.isArray(products) ? products : products.data || [];

  const category = categoryList.find((c) => c.slug === slug || c.id === slug);

  return (
    
      
      <section className="mx-auto mt-8 w-full max-w-6xl px-4">
        {/* Category heading (ager moto, kono change nai) */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <span className="text-5xl">{category?.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category?.nameBn || slug}
            </h1>
            <p className="text-sm text-gray-500">
              {toBn(productList.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort + product list */}
        <CategoryProducts products={productList} />
      </section>
  );
};

const CategoryDetailsPage = ({ params }) => {
  return (
    <Suspense fallback={<p className="mt-10 text-center">Loading...</p>}>
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default CategoryDetailsPage;

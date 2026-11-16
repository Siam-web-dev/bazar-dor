import ProductCard from "./ProductCard";

const toBn = (num) => Number(num).toLocaleString("bn-BD");

const AllProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  if (!res.ok) {
    return <p className="mt-10 text-center">ডেটা লোড করা যায়নি</p>;
  }

  const products = await res.json();

  if (!products || products.length === 0) {
    return <p className="mt-10 text-center">কোনো পণ্য পাওয়া যায়নি</p>;
  }

  return (
    <section id="all-products" className="mx-auto mt-8 w-full max-w-6xl px-4">
      <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
      <p className="mb-4 mt-1 text-sm text-gray-500">
        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
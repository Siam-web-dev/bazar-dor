"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const toBn = (num) => Number(num).toLocaleString("bn-BD");

const CategoryProducts = ({ products }) => {
  const [sort, setSort] = useState("default");

  // original array ke change na kore sort korbo
  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "low") return list.sort((a, b) => a.today - b.today);
    if (sort === "high") return list.sort((a, b) => b.today - a.today);

    return list; // default: API er order
  }, [products, sort]);

  return (
    <>
      {/* Sort control */}
      <div className="mb-4 flex items-center justify-end gap-3 rounded-2xl border border-green-100 bg-white px-6 py-4 shadow-sm">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        মোট {toBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length === 0 ? (
        <p className="mt-10 text-center">কোনো পণ্য পাওয়া যায়নি</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryProducts;
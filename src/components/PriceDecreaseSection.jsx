"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PriceDecreaseSection = () => {
  const [topDecreaseProduct, setTopDecreaseProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();
        const filteredData = data
          .filter((item) => item.change.dir === "down")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);
        setTopDecreaseProduct(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="mx-auto mt-10 w-full max-w-6xl px-4">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        <span className="text-green-600">▼</span> আজ দাম কমেছে
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topDecreaseProduct.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      )}
    </section>
  );
};

export default PriceDecreaseSection;
"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PriceIncreaseSection = () => {
  const [topIncreaseProduct, setTopIncreaseProduct] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();
        const filteredData = data
          .filter((item) => item.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);
        setTopIncreaseProduct(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="mx-auto mt-10 w-full max-w-6xl px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topIncreaseProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PriceIncreaseSection;

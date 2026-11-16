"use client";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";

const Hero = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mx-auto mt-6 w-full max-w-6xl px-4">
      <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-green-100 bg-white px-8 py-10 shadow-sm md:flex-row md:px-12">
        {/* Left: text */}
        <div className="flex max-w-xl flex-col items-start gap-4">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {today}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link href={"/#all-products"}>
            <Button className="mt-2 rounded-lg bg-green-700 px-6 font-semibold text-white">
              সব পণ্য দেখুন
            </Button>
          </Link>
        </div>

        <div className="flex  items-center justify-center md:h-72 md:w-[40%]">
          <Image
            src="/assets/bazar-hero.png"
            alt="..."
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

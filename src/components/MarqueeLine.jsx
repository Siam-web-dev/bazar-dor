"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Chip } from "@heroui/react";
const MarqueeLine = () => {
    const [product , setProduct] = useState([]) ;

    useEffect(() => {
        const fetchProducts = async() => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`) ;
            const data = await res.json(); 
            setProduct(data) ; 
            
        }
         fetchProducts() ;
    }, [])
  return (
    <div>
      <Marquee
       className="mt-5"
       pauseOnHover={true} 
       speed={45} 
       >
        {product.map((item) => {
            const isUp = item.change.dir === "up" ;
            const isDown = item.change.dir === "down" ;
            return (
                <Link 
                key={item.id}
                href={`/product/${item.slag}`}
                className="flex items-center gap-2 mx-3 px-3 py-1"
                >
                 <span> {item.image} </span>
                 <span> {item.nameBn} </span>
                 <span>  {Number(item.today).toLocaleString("bn-BD")} টাকা/কেজি  </span>   
                 <Chip
                size="sm"
                className={`px-2 py-0.5 h-5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${
                  isUp
                    ? " text-[#e11d48]"
                    : isDown
                      ? " text-[#059669]"
                      : "bg-slate-200 text-slate-700"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {!isUp && !isDown && "— "}
                <span className="text-[18px] font-bold">{item.change.pct}</span>
              </Chip>
                </Link>
            )

        })}
      </Marquee>

      
    </div>
  );
};

export default MarqueeLine;

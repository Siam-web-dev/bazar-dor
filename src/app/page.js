import AllProducts from '@/components/AllProducts';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PriceDecreaseSection from '@/components/PriceDecreaseSection';
import PriceIncreaseSection from '@/components/PriceIncreaseSection';
import { Spinner } from '@heroui/react';
import React, { Suspense } from 'react';

const Page = () => {
  return (
    <div>
       <Suspense 
       fallback={
               <div className="flex flex-col items-center gap-2">
                 <Spinner size="xl" />
                 <span className="text-xs text-muted">Loading...</span>
               </div>
             }
       >
        <Hero></Hero>
        <PriceIncreaseSection></PriceIncreaseSection>
        <PriceDecreaseSection></PriceDecreaseSection>
        <AllProducts></AllProducts>
       </Suspense>
    </div>
  );
};

export default Page;
import AllProducts from '@/components/AllProducts';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PriceDecreaseSection from '@/components/PriceDecreaseSection';
import PriceIncreaseSection from '@/components/PriceIncreaseSection';
import React, { Suspense } from 'react';

const Page = () => {
  return (
    <div>
       <Suspense>
        <Hero></Hero>
        <PriceIncreaseSection></PriceIncreaseSection>
        <PriceDecreaseSection></PriceDecreaseSection>
        <AllProducts></AllProducts>
       </Suspense>
    </div>
  );
};

export default Page;
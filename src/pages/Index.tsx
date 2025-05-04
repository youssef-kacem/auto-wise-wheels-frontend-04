
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import FeaturedCars from '@/components/home/FeaturedCars';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedCars />
      <Services />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;

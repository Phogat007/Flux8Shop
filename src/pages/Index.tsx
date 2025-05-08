
import React from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/hero/HeroSection";
import CategorySection from "@/components/categories/CategorySection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import TestimonialSection from "@/components/testimonials/TestimonialSection";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import FeaturesSection from "@/components/features/FeaturesSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CategorySection />
      <FeaturedProducts />
      <TestimonialSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;

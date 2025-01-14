import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import HeroSection from "./home/HeroSection";
import MatchesOverview from "./matches/MatchesOverview";
import FeaturedSections from "./home/FeaturedSections";
import GalleryPreview from "./gallery/GalleryPreview";

interface HomePageProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
  heroData?: {
    backgroundImage?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    announcement?: {
      text: string;
      date: string;
    };
  };
}

const HomePage = ({
  isLoggedIn = false,
  cartItemCount = 0,
  heroData = {
    backgroundImage:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80",
    title: "Welcome to MAROON'S FC",
    subtitle: "Experience the thrill of the beautiful game",
    ctaText: "Buy Tickets",
    ctaLink: "#tickets",
    announcement: {
      text: "Next Home Game vs. Uthiru Vision",
      date: "Saturday, Feb 15th, 2025",
    },
  },
}: HomePageProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} cartItemCount={cartItemCount} />

      <main className="flex-grow">
        <HeroSection
          backgroundImage={heroData.backgroundImage}
          title={heroData.title}
          subtitle={heroData.subtitle}
          ctaText={heroData.ctaText}
          ctaLink={heroData.ctaLink}
          announcement={heroData.announcement}
        />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Latest Matches
            </h2>
            <MatchesOverview />
          </div>
        </section>

        <FeaturedSections />

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <GalleryPreview />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

interface HeroSectionProps {
  backgroundImages?: string[];
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  announcement?: {
    text: string;
    date: string;
  };
}

const HeroSection = ({
  backgroundImages = [
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
    "https://images.unsplash.com/photo-1577223625816-7546f13df25d",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d",
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
  ],
  title = "Welcome to FC United",
  subtitle = "Experience the thrill of the beautiful game",
  ctaText = "Buy Tickets",
  ctaLink = "#tickets",
  announcement = {
    text: "Next Home Game vs. City Rivals",
    date: "Saturday, March 15th, 2024",
  },
}: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative w-full h-[100vh] bg-slate-900 overflow-hidden -mt-20">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image}?auto=format&fit=crop&q=80)`,
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-20 pt-20">
        {/* Announcement Banner */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="font-medium">{announcement.text}</span>
            <span className="mx-2">•</span>
            <span>{announcement.date}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">{subtitle}</p>
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-gray-900"
            asChild
          >
            <a href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

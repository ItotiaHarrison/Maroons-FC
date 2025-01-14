import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MatchesOverview from "@/components/matches/MatchesOverview";

const FixturesPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
      <div className="container mx-auto px-4 py-20 sm:py-24">
          <h1 className="text-4xl font-bold mb-8">Fixtures</h1>
          <MatchesOverview />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FixturesPage;

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MatchesOverview from "@/components/matches/MatchesOverview";

const ResultsPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Results</h1>
          <MatchesOverview />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;

import MatchesOverview from "@/components/matches/MatchesOverview";

const ResultsPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      <main className="flex-grow">
      <div className="container mx-auto px-4 py-20 sm:py-24">
          <h1 className="text-4xl font-bold mb-8">Results</h1>
          <MatchesOverview />
        </div>
      </main>
      
    </div>
  );
};

export default ResultsPage;

import HeroSection from "./home/HeroSection";
import MatchesOverview from "./matches/MatchesOverview";
import FeaturedSections from "./home/FeaturedSections";
import GalleryPreview from "./gallery/GalleryPreview";

interface HomePageProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
}

const HomePage = ({
  isLoggedIn = false,
  cartItemCount = 0,
}: HomePageProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          <HeroSection />
        </section>

        {/* Latest Matches Section */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Latest Matches
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Stay updated with our recent games
              </p>
            </div>
            <div className="max-w-7xl mx-auto overflow-x-auto">
              <div className="min-w-full sm:min-w-0">
                <MatchesOverview />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sections */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <FeaturedSections />
            </div>
          </div>
        </section>

        {/* Gallery Preview Section */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <GalleryPreview />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

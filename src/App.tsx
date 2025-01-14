import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import FacilitiesPage from "./pages/facilities";
import HistoryPage from "./pages/history";
import TeamPage from "./pages/team";
import FixturesPage from "./pages/fixtures";
import ResultsPage from "./pages/results";
import StandingsPage from "./pages/standings";
import GalleryPage from "./pages/gallery";
import StatisticsPage from "./pages/statistics";
import routes from "tempo-routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/fixtures" element={<FixturesPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
        </Layout>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </Suspense>
  );
}

export default App;

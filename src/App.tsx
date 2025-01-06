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
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/fixtures" element={<FixturesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;

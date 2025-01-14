import React, { useEffect, useState } from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";
import { fetchPlayersWithStats, updatePlayerStats } from "@/lib/api";

type PlayerWithStats = {
  id: string;
  name: string;
  image_url: string;
  position: string;
  appearances: number;
  goals: number;
};

const StatisticsPage = () => {
  const [players, setPlayers] = useState<PlayerWithStats[]>([]);
  const [season, setSeason] = useState("2023-24");
  const [competition, setCompetition] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const [isCompetitionOpen, setIsCompetitionOpen] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    variant: "success" | "error";
    title: string;
    message: string;
  }>({ show: false, variant: "success", title: "", message: "" });

  const showToast = (
    variant: "success" | "error",
    title: string,
    message: string
  ) => {
    setToast({ show: true, variant, title, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const loadStats = async () => {
    try {
      const data = await fetchPlayersWithStats(season, competition);
      setPlayers(data);
    } catch (error) {
      console.error("Error loading stats:", error);
      showToast("error", "Error", "Failed to load player statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [season, competition]);

  const incrementStat = async (
    playerId: string,
    stat: "goals" | "appearances"
  ) => {
    try {
      await updatePlayerStats(playerId, season, competition, stat, "increment");
      showToast("success", "Success", `Player ${stat} updated successfully`);
      loadStats();
    } catch (error) {
      console.error(`Error updating ${stat}:`, error);
      showToast("error", "Error", `Failed to update player ${stat}`);
    }
  };

  const decrementStat = async (
    playerId: string,
    stat: "goals" | "appearances"
  ) => {
    try {
      const player = players.find((p) => p.id === playerId);
      if (!player || player[stat] <= 0) {
        showToast("error", "Error", `Cannot decrease ${stat} below 0`);
        return;
      }

      await updatePlayerStats(playerId, season, competition, stat, "decrement");
      showToast("success", "Success", `Player ${stat} decreased successfully`);
      loadStats();
    } catch (error) {
      console.error(`Error updating ${stat}:`, error);
      showToast("error", "Error", `Failed to decrease player ${stat}`);
    }
  };

  const sortedByGoals = [...players].sort((a, b) => b.goals - a.goals);
  const sortedByAppearances = [...players].sort(
    (a, b) => b.appearances - a.appearances
  );

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            toast.variant === "success"
              ? "bg-green-100 border-green-500"
              : "bg-red-100 border-red-500"
          } border`}
        >
          <h4
            className={`font-semibold ${
              toast.variant === "success" ? "text-green-800" : "text-red-800"
            }`}
          >
            {toast.title}
          </h4>
          <p
            className={
              toast.variant === "success" ? "text-green-600" : "text-red-600"
            }
          >
            {toast.message}
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 py-20 sm:py-24">
        {/* Header Section */}
        <div className="md:flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">
            Player Statistics
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Season Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSeasonOpen(!isSeasonOpen)}
                className="w-full sm:w-[180px] px-4 py-2 text-left border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="flex items-center justify-between">
                  <span>{season}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isSeasonOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              {isSeasonOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                  <div className="py-1">
                    {["2025-26", "2026-27"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSeason(s);
                          setIsSeasonOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Competition Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCompetitionOpen(!isCompetitionOpen)}
                className="w-full sm:w-[180px] px-4 py-2 text-left border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="flex items-center justify-between">
                  <span>
                    {competition === "all"
                      ? "All Competitions"
                      : competition.charAt(0).toUpperCase() + competition.slice(1)}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCompetitionOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              {isCompetitionOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                  <div className="py-1">
                    {[
                      { value: "all", label: "All Competitions" },
                      { value: "league", label: "Friendlies" },
                      { value: "cup", label: "Training" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setCompetition(option.value);
                          setIsCompetitionOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Scorers Card */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl md:text-2xl font-semibold">Top Scorers</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sortedByGoals.map((player) => (
                  <div
                    key={player.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
                  >
                    {/* Player Info */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={player.image_url}
                        alt={player.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{player.name}</h3>
                        <p className="text-sm text-gray-600">{player.position}</p>
                      </div>
                    </div>

                    {/* Stats and Controls */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Goals</p>
                          <p className="text-xl font-bold">{player.goals}</p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="text-sm text-gray-600">G/Game</p>
                          <p className="font-semibold">
                            {player.appearances > 0
                              ? (player.goals / player.appearances).toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => decrementStat(player.id, "goals")}
                          disabled={player.goals <= 0}
                          className={`p-2 rounded-md border ${
                            player.goals <= 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => incrementStat(player.id, "goals")}
                          className="p-2 rounded-md border hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Appearances Card */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl md:text-2xl font-semibold">Appearances</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sortedByAppearances.map((player) => (
                  <div
                    key={player.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
                  >
                    {/* Player Info */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={player.image_url}
                        alt={player.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{player.name}</h3>
                        <p className="text-sm text-gray-600">{player.position}</p>
                      </div>
                    </div>

                    {/* Stats and Controls */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Appearances</p>
                        <p className="text-xl font-bold">{player.appearances}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            decrementStat(player.id, "appearances")
                          }
                          disabled={player.appearances <= 0}
                          className={`p-2 rounded-md border ${
                            player.appearances <= 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            incrementStat(player.id, "appearances")
                          }
                          className="p-2 rounded-md border hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;

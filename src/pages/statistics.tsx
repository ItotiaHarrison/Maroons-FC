import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { fetchPlayerStats, updatePlayerStats } from "@/lib/api";

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

  const loadStats = async () => {
    try {
      const data = await fetchPlayerStats(season, competition);
      // Transform the data to match our component's needs
      const transformedData = data.map((stat) => ({
        id: stat.player_id,
        name: stat.players.name,
        image_url: stat.players.image_url,
        position: stat.players.position,
        appearances: stat.appearances || 0,
        goals: stat.goals || 0,
      }));
      setPlayers(transformedData);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [season, competition]);

  const incrementStat = async (
    playerId: string,
    stat: "goals" | "appearances",
  ) => {
    try {
      await updatePlayerStats(playerId, season, competition, stat);
      loadStats(); // Reload the stats
    } catch (error) {
      console.error(`Error updating ${stat}:`, error);
    }
  };

  const sortedByGoals = [...players].sort((a, b) => b.goals - a.goals);
  const sortedByAppearances = [...players].sort(
    (a, b) => b.appearances - a.appearances,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12 text-center">
            Loading statistics...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Player Statistics</h1>
            <div className="flex gap-4">
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-24">2023-24</SelectItem>
                  <SelectItem value="2022-23">2022-23</SelectItem>
                </SelectContent>
              </Select>
              <Select value={competition} onValueChange={setCompetition}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select competition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Competitions</SelectItem>
                  <SelectItem value="league">League</SelectItem>
                  <SelectItem value="cup">Cup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Scorers */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Top Scorers</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedByGoals.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={player.image_url}
                          alt={player.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-gray-600">
                            {player.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Goals</p>
                          <p className="text-xl font-bold">{player.goals}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">G/Game</p>
                          <p className="font-semibold">
                            {player.appearances > 0
                              ? (player.goals / player.appearances).toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => incrementStat(player.id, "goals")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Appearances */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Appearances</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedByAppearances.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={player.image_url}
                          alt={player.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-gray-600">
                            {player.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Appearances</p>
                          <p className="text-xl font-bold">
                            {player.appearances}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            incrementStat(player.id, "appearances")
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatisticsPage;

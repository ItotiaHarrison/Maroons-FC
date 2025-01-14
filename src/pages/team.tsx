import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AddPlayerDialog } from "@/components/players/AddPlayerDialog";
import { EditPlayerDialog } from "@/components/players/EditPlayerDialog";
import { fetchPlayers, type Player } from "@/lib/api";

const ROLE_ORDER = ["Coach", "Captain", "Treasurer", "Member"];

const TeamPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlayers = async () => {
    try {
      const data = await fetchPlayers();
      setPlayers(data);
    } catch (error) {
      console.error("Error loading players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  // Group players by role
  const playersByRole = players.reduce((groups, player) => {
    const role = player.role || "Member";
    if (!groups[role]) {
      groups[role] = [];
    }
    groups[role].push(player);
    return groups;
  }, {} as Record<string, Player[]>);

  // Sort players within each role group by name
  Object.keys(playersByRole).forEach((role) => {
    playersByRole[role].sort((a, b) => a.name.localeCompare(b.name));
  });

  const PlayerCard = ({ player }: { player: Player }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative group">
      <EditPlayerDialog player={player} onPlayerUpdated={loadPlayers} />
      <CardContent className="p-6">
        <div className="aspect-square w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
          <img
            src={
              player.image_url ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name.replace(
                / /g,
                ""
              )}`
            }
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-1">{player.name}</h2>
          <p className="text-gray-600 mb-1">{player.position}</p>
          {player.jersey_number && (
            <p className="text-sm text-gray-500 mb-1">#{player.jersey_number}</p>
          )}
          <p className="text-sm text-gray-500 capitalize">{player.gender}</p>
        </div>
      </CardContent>
    </Card>
  );

  const RoleSection = ({ role, players }: { role: string; players: Player[] }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {role === "Member" ? "Team Members" : `${role}`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Meet Our Team
            </h1>
            <AddPlayerDialog onPlayerAdded={loadPlayers} />
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading team members...</p>
            </div>
          ) : players.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No players added yet.</p>
              <p className="text-sm text-gray-500 mt-2">
                Click the "Add Player" button to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {ROLE_ORDER.map((role) => {
                const rolePlayers = playersByRole[role] || [];
                if (rolePlayers.length === 0) return null;

                return (
                  <RoleSection
                    key={role}
                    role={role}
                    players={rolePlayers}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;

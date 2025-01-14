import { supabase } from "./supabase";

export interface Player {
  id: string;
  name: string;
  position: string;
  role: string;
  gender: string;
  jersey_number?: number;
  image_url?: string;
  created_at?: string;
}

export interface PlayerStats {
  id: string;
  player_id: string;
  season: string;
  competition: string;
  appearances: number;
  goals: number;
  created_at?: string;
  updated_at?: string;
  players?: Player;
}

export const fetchPlayers = async () => {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching players:", error);
    throw new Error(error.message);
  }
  return data;
};

export const fetchPlayersWithStats = async (
  season: string,
  competition: string = "all",
) => {
  // First fetch all players
  const { data: players, error: playersError } = await supabase
    .from("players")
    .select()
    .order("name");

  if (playersError) throw new Error(playersError.message);

  // Then fetch stats for the given season and competition
  let statsQuery = supabase.from("player_stats").select("*");

  if (competition !== "all") {
    statsQuery = statsQuery.eq("competition", competition);
  }

  const { data: stats, error: statsError } = await statsQuery.eq(
    "season",
    season,
  );

  if (statsError) throw new Error(statsError.message);

  // Combine players with their stats
  return players.map((player) => {
    const playerStats = stats?.find(
      (stat) =>
        stat.player_id === player.id &&
        stat.season === season &&
        (competition === "all" || stat.competition === competition),
    ) || { appearances: 0, goals: 0 };

    return {
      id: player.id,
      name: player.name,
      position: player.position,
      role: player.role,
      gender: player.gender,
      jersey_number: player.jersey_number,
      image_url: player.image_url,
      appearances: playerStats.appearances || 0,
      goals: playerStats.goals || 0,
    };
  });
};

export const addPlayer = async (player: Omit<Player, "id" | "created_at">) => {
  const { data, error } = await supabase
    .from("players")
    .insert([player])
    .select()
    .single();

  if (error) {
    console.error("Error adding player:", error);
    throw new Error(error.message);
  }
  return data;
};

export const updatePlayer = async (
  id: string,
  updates: Partial<Omit<Player, "id" | "created_at">>,
) => {
  const { data, error } = await supabase
    .from("players")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating player:", error);
    throw new Error(error.message);
  }
  return data;
};

export const deletePlayer = async (id: string) => {
  const { error } = await supabase.from("players").delete().eq("id", id);

  if (error) {
    console.error("Error deleting player:", error);
    throw new Error(error.message);
  }
};

export const updatePlayerStats = async (
  playerId: string,
  season: string,
  competition: string,
  stat: "goals" | "appearances",
  operation: "increment" | "decrement"
) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from("player_stats")
      .select("*")
      .eq("player_id", playerId)
      .eq("season", season)
      .eq("competition", competition)
      .maybeSingle();

    if (findError) {
      console.error("Error finding player stats:", findError);
      throw findError;
    }

    if (existing) {
      const currentValue = existing[stat] || 0;

      if (operation === "decrement" && currentValue <= 0) {
        throw new Error(`Cannot decrement ${stat} below 0`);
      }

      const newValue = operation === "increment"
        ? currentValue + 1
        : currentValue - 1;

      const updates = {
        [stat]: newValue,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("player_stats")
        .update(updates)
        .eq("id", existing.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating player stats:", error);
        throw new Error(error.message);
      }
      return data;
    } else {
      if (operation === "decrement") {
        return null;
      }

      const newRecord = {
        player_id: playerId,
        season,
        competition,
        goals: stat === "goals" ? 1 : 0,
        appearances: stat === "appearances" ? 1 : 0,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("player_stats")
        .insert(newRecord)
        .select()
        .single();

      if (error) {
        console.error("Error creating player stats:", error);
        throw new Error(error.message);
      }
      return data;
    }
  } catch (error) {
    console.error("Error updating player stats:", error);
    throw error;
  }
};

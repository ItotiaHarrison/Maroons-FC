import { supabase } from "./supabase";

export interface Player {
  id: string;
  name: string;
  position: string;
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

export const fetchPlayerStats = async (
  season: string,
  competition: string = "all",
) => {
  let query = supabase.from("player_stats").select(`*, players(*)`);

  if (competition !== "all") {
    query = query.eq("competition", competition);
  }

  const { data, error } = await query.eq("season", season);

  if (error) {
    console.error("Error fetching player stats:", error);
    throw new Error(error.message);
  }
  return data;
};

export const updatePlayerStats = async (
  playerId: string,
  season: string,
  competition: string,
  stat: "goals" | "appearances",
) => {
  const { data: existing, error: findError } = await supabase
    .from("player_stats")
    .select()
    .eq("player_id", playerId)
    .eq("season", season)
    .eq("competition", competition)
    .maybeSingle();

  if (findError) {
    console.error("Error finding player stats:", findError);
    throw new Error(findError.message);
  }

  if (existing) {
    const { data, error } = await supabase
      .from("player_stats")
      .update({ [stat]: existing[stat] + 1 })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating player stats:", error);
      throw new Error(error.message);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("player_stats")
      .insert({
        player_id: playerId,
        season,
        competition,
        [stat]: 1,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating player stats:", error);
      throw new Error(error.message);
    }
    return data;
  }
};

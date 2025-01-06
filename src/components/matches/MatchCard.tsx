import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface Team {
  name: string;
  logo: string;
  score?: number;
}

interface MatchCardProps {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  venue: string;
  isUpcoming?: boolean;
}

const MatchCard = ({
  homeTeam = {
    name: "Home Team",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=HT",
  },
  awayTeam = {
    name: "Away Team",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AT",
  },
  date = "2024-03-15",
  time = "19:45",
  venue = "Main Stadium",
  isUpcoming = true,
}: MatchCardProps) => {
  return (
    <Card className="w-[380px] h-[200px] bg-white hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge variant={isUpcoming ? "default" : "secondary"}>
            {isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{homeTeam.name}</p>
              {!isUpcoming && (
                <span className="text-2xl font-bold">{homeTeam.score}</span>
              )}
            </div>
          </div>
          <span className="text-xl font-bold">vs</span>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold">{awayTeam.name}</p>
              {!isUpcoming && (
                <span className="text-2xl font-bold">{awayTeam.score}</span>
              )}
            </div>
            <img
              src={awayTeam.logo}
              alt={awayTeam.name}
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{venue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;

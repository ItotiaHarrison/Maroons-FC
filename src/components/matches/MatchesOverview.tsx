import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "./MatchCard";

interface Match {
  homeTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  date: string;
  time: string;
  venue: string;
  isUpcoming: boolean;
}

interface MatchesOverviewProps {
  upcomingMatches?: Match[];
  recentResults?: Match[];
}

const defaultUpcomingMatches: Match[] = [
  {
    homeTeam: {
      name: "Local FC",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=LFC",
    },
    awayTeam: {
      name: "Visitors United",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=VU",
    },
    date: "2024-03-20",
    time: "20:00",
    venue: "Home Stadium",
    isUpcoming: true,
  },
  {
    homeTeam: {
      name: "Away City",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=AC",
    },
    awayTeam: {
      name: "Local FC",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=LFC",
    },
    date: "2024-03-27",
    time: "19:45",
    venue: "City Arena",
    isUpcoming: true,
  },
];

const defaultRecentResults: Match[] = [
  {
    homeTeam: {
      name: "Local FC",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=LFC",
      score: 2,
    },
    awayTeam: {
      name: "Royal Athletic",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=RA",
      score: 1,
    },
    date: "2024-03-13",
    time: "20:00",
    venue: "Home Stadium",
    isUpcoming: false,
  },
  {
    homeTeam: {
      name: "United Sports",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=US",
      score: 0,
    },
    awayTeam: {
      name: "Local FC",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=LFC",
      score: 3,
    },
    date: "2024-03-06",
    time: "19:45",
    venue: "Sports Complex",
    isUpcoming: false,
  },
];

const MatchesOverview = ({
  upcomingMatches = defaultUpcomingMatches,
  recentResults = defaultRecentResults,
}: MatchesOverviewProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-gray-50">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
          <TabsTrigger value="results">Recent Results</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {upcomingMatches.map((match, index) => (
              <MatchCard
                key={`upcoming-${index}`}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                date={match.date}
                time={match.time}
                venue={match.venue}
                isUpcoming={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {recentResults.map((match, index) => (
              <MatchCard
                key={`result-${index}`}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                date={match.date}
                time={match.time}
                venue={match.venue}
                isUpcoming={false}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchesOverview;

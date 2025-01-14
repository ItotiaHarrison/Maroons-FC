import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const standings = [
  {
    position: 1,
    team: "Local FC",
    played: 28,
    won: 20,
    drawn: 5,
    lost: 3,
    points: 65,
  },
  {
    position: 2,
    team: "City United",
    played: 28,
    won: 18,
    drawn: 6,
    lost: 4,
    points: 60,
  },
  {
    position: 3,
    team: "Athletic Club",
    played: 28,
    won: 17,
    drawn: 7,
    lost: 4,
    points: 58,
  },
  {
    position: 4,
    team: "Royal FC",
    played: 28,
    won: 16,
    drawn: 6,
    lost: 6,
    points: 54,
  },
];

const StandingsPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">League Table</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((team) => (
                <TableRow key={team.position}>
                  <TableCell className="font-medium">{team.position}</TableCell>
                  <TableCell>{team.team}</TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center">{team.won}</TableCell>
                  <TableCell className="text-center">{team.drawn}</TableCell>
                  <TableCell className="text-center">{team.lost}</TableCell>
                  <TableCell className="text-center font-bold">
                    {team.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
     
    </div>
  );
};

export default StandingsPage;

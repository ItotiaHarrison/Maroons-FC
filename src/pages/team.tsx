import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const players = [
  {
    name: "John Smith",
    position: "Forward",
    number: 9,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JS9",
  },
  {
    name: "Mike Johnson",
    position: "Midfielder",
    number: 8,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MJ8",
  },
  {
    name: "David Wilson",
    position: "Defender",
    number: 4,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DW4",
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Our Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map((player, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-32 h-32 mx-auto mb-4 rounded-full"
                  />
                  <h2 className="text-xl font-semibold">{player.name}</h2>
                  <p className="text-gray-600">{player.position}</p>
                  <div className="mt-2 text-2xl font-bold text-primary">
                    #{player.number}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;

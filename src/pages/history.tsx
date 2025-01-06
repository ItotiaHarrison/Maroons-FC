import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
  {
    year: "1900",
    title: "Club Founded",
    description: "The club was established by local football enthusiasts",
  },
  {
    year: "1950",
    title: "First League Title",
    description: "Won the domestic league for the first time",
  },
  {
    year: "1975",
    title: "Stadium Inauguration",
    description: "Moved to our current home stadium",
  },
  {
    year: "2000",
    title: "European Success",
    description: "First European trophy won",
  },
];

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Club History</h1>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <Card key={index} className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                <CardContent className="p-6 ml-16">
                  <div className="absolute left-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                  <div className="text-2xl font-bold mb-2">{event.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
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

export default HistoryPage;

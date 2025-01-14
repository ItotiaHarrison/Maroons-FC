import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, ShoppingBag, Ticket } from "lucide-react";

interface FeaturedSection {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  link: string;
}

interface FeaturedSectionsProps {
  sections?: FeaturedSection[];
}

const FeaturedSections = ({
  sections = [
    {
      title: "World-Class Facilities",
      description:
        "Explore our state-of-the-art training grounds and stadium facilities",
      image:
        "https://images.unsplash.com/photo-1571056642505-0f3eefad1b1a?w=800&auto=format&fit=crop",
      icon: <Trophy className="h-6 w-6" />,
      link: "/facilities",
    },
    {
      title: "Club Shop",
      description: "Get the latest team merchandise and fan gear",
      image:
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&auto=format&fit=crop",
      icon: <ShoppingBag className="h-6 w-6" />,
      link: "/shop",
    },
    {
      title: "Community Programs",
      description: "Join our youth programs and community events",
      image:
        "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&auto=format&fit=crop",
      icon: <Users className="h-6 w-6" />,
      link: "/community",
    },
    {
      title: "Match Tickets",
      description: "Secure your seats for upcoming matches",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop",
      icon: <Ticket className="h-6 w-6" />,
      link: "/tickets",
    },
  ],
}: FeaturedSectionsProps) => {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore our team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              <div className="relative h-48">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                  {section.icon}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() => console.log(`Navigating to ${section.link}`)}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;

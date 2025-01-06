import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryItem {
  id: string;
  type: "photo" | "video";
  url: string;
  title: string;
  date: string;
}

interface GalleryPreviewProps {
  items?: GalleryItem[];
}

const GalleryPreview = ({
  items = [
    {
      id: "1",
      type: "photo",
      url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
      title: "Match Day Highlights",
      date: "2024-03-10",
    },
    {
      id: "2",
      type: "photo",
      url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
      title: "Training Session",
      date: "2024-03-09",
    },
    {
      id: "3",
      type: "photo",
      url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
      title: "Fan Celebration",
      date: "2024-03-08",
    },
    {
      id: "4",
      type: "video",
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
      title: "Goal of the Month",
      date: "2024-03-07",
    },
  ],
}: GalleryPreviewProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white">
      <Tabs defaultValue="photos" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Gallery</h2>
          <TabsList>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="photos">
          <Carousel className="w-full">
            <CarouselContent>
              {items
                .filter((item) => item.type === "photo")
                .map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-[300px] overflow-hidden">
                      <CardContent className="p-0 h-full">
                        <div className="relative h-full group">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-semibold">
                              {item.title}
                            </h3>
                            <p className="text-white/80 text-sm">{item.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </TabsContent>

        <TabsContent value="videos">
          <Carousel className="w-full">
            <CarouselContent>
              {items
                .filter((item) => item.type === "video")
                .map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-[300px] overflow-hidden">
                      <CardContent className="p-0 h-full">
                        <div className="relative h-full group">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-black border-b-8 border-b-transparent ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-semibold">
                              {item.title}
                            </h3>
                            <p className="text-white/80 text-sm">{item.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GalleryPreview;

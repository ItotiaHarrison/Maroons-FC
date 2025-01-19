import { Card, CardContent } from "@/components/ui/card";

const facilities = [
  {
    name: "Main Stadium",
    description: "50,000-seat modern stadium with state-of-the-art facilities",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d",
  },
  {
    name: "Training Complex",
    description: "Professional training grounds with multiple pitches",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e",
  },
  {
    name: "Youth Academy",
    description: "Dedicated facility for nurturing young talent",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d",
  },
];

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow">
      <div className="container mx-auto px-4 py-20 sm:py-24">
          <h1 className="text-4xl font-bold mb-8">Our Facilities</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {facility.name}
                  </h2>
                  <p className="text-gray-600">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacilitiesPage;

import GalleryPreview from "@/components/gallery/GalleryPreview";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
     
      <main className="flex-grow">
      <div className="container mx-auto px-4 py-20 sm:py-24">
          <h1 className="text-4xl font-bold mb-8">Gallery</h1>
          <GalleryPreview />
        </div>
      </main>
      
    </div>
  );
};

export default GalleryPage;

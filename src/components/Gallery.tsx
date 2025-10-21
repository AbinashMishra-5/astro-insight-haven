import { Card } from "@/components/ui/card";
import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";

const Gallery = () => {
  const images = [
    { src: c1, alt: "Gallery Image 1" },
    { src: c2, alt: "Gallery Image 2" },
    { src: c3, alt: "Gallery Image 3" },
    { src: c4, alt: "Gallery Image 4" },
  ];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Our Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our spiritual journey and sacred spaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

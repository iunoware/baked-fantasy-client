import { useState, useEffect } from "react";

const images = ["../../public/cake-bg-1.png", "../../public/cake-bg-2.png"];

function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 5000; // 3 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, delay);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <>
      <div className="relative w-full h-170 overflow-hidden rounded-lg">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-170 object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Optional: Previous/Next buttons */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        >
          ›
        </button>
      </div>
    </>
  );
}

export default About;

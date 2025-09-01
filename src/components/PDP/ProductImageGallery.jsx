import { useState } from "react";

export default function ProductImageGallery({ images, alt }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square rounded-xl overflow-hidden border">
        <img
          src={selectedImage}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square rounded-lg overflow-hidden border-2 ${
              selectedImage === image ? "border-pink-500" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

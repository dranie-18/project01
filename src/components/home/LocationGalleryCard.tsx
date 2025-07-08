import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LocationImageData } from '../../data/locationImages';

interface LocationGalleryCardProps {
  locationData: LocationImageData;
  propertyCount: number;
}

const LocationGalleryCard: React.FC<LocationGalleryCardProps> = ({ locationData, propertyCount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Ensure at least 4 images are available, or use what's there, up to 8
  const imagesToDisplay = locationData.images.slice(0, Math.min(locationData.images.length, 8));

  const mainImage = imagesToDisplay[currentImageIndex] || imagesToDisplay[0]; // Fallback to first if index out of bounds

  const handleThumbnailClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); // Prevent navigation
    setCurrentImageIndex(index);
  };

  return (
    <Link
      to={`/lokasi/${locationData.slug}`}
      className="relative overflow-hidden rounded-2xl group h-full flex flex-col"
      aria-label={`Lihat properti di ${locationData.name}, ${locationData.province}`}
    >
      {/* Main Image Display */}
      <div className="relative flex-grow overflow-hidden h-[250px] md:h-[400px]"> {/* Fixed height for consistency */}
        <img
          src={mainImage.url}
          alt={mainImage.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300 flex flex-col justify-end p-5">
          <h3 className="font-heading text-white font-semibold text-xl mb-1 transform group-hover:translate-y-0 transition-transform duration-300">
            {locationData.name}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-200 text-sm">{locationData.province}</p>
              <p className="text-white text-sm">{propertyCount.toLocaleString()} properti</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 translate-x-4">
              <ArrowRight className="text-primary" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {imagesToDisplay.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 flex justify-center space-x-1">
          {imagesToDisplay.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => handleThumbnailClick(e, index)}
              className={`w-8 h-8 rounded-full overflow-hidden border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </Link>
  );
};

export default LocationGalleryCard;

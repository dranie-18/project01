import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react'; // Import MapPin for placeholder
import { LocationImageData } from '../../data/locationImages';

interface LocationGalleryCardProps {
  locationData: LocationImageData;
  propertyCount: number;
  isFeatured?: boolean; // New prop
  className?: string; // New prop
}

const LocationGalleryCard: React.FC<LocationGalleryCardProps> = ({ locationData, propertyCount, isFeatured, className = '' }) => {
  // No need for currentImageIndex or imagesToDisplay state/logic if no images are rendered

  const imageHeightClass = isFeatured ? 'h-[400px]' : 'h-[200px]'; // Dynamic height based on prop

  return (
    <Link
      to={`/lokasi/${locationData.slug}`}
      className={`relative overflow-hidden rounded-2xl group flex flex-col ${className}`} // Apply className here
      aria-label={`Lihat properti di ${locationData.name}, ${locationData.province}`}
    >
      {/* Main Image Display - Now a placeholder */}
      <div className={`relative flex-grow overflow-hidden ${imageHeightClass} bg-neutral-200 flex items-center justify-center`}>
        {/* Removed <img> tag */}
        <MapPin size={48} className="text-neutral-400" /> {/* Placeholder icon */}

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

      {/* Thumbnail Gallery - Removed entirely as no images are displayed */}
      {/* The previous thumbnail gallery code block was here */}
    </Link>
  );
};

export default LocationGalleryCard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { locationService } from '../../services/locationService';
import { locationImagesData, LocationImageData } from '../../data/locationImages'; // Import new data
import LocationGalleryCard from './LocationGalleryCard'; // Import new component

interface LocationCardProps { // This interface is no longer directly used for rendering, but for data mapping
  name: string;
  province: string;
  image: string; // This will become an array of images in the new structure
  propertyCount: number;
  slug: string;
}

const PopularLocations: React.FC = () => {
  const [locations, setLocations] = useState<LocationImageData[]>([]); // Change type to LocationImageData
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPopularLocations();
  }, []);

  const fetchPopularLocations = async () => {
    setIsLoading(true);
    try {
      // Get popular locations from database
      const popularLocations = await locationService.getAllLocations({
        isActive: true
      });
      
      // Sort by property count and take top locations
      const sortedLocations = popularLocations
        .sort((a, b) => (b.property_count || 0) - (a.property_count || 0))
        .slice(0, 6);
      
      // Map to LocationImageData structure, including images
      const locationsWithImages: LocationImageData[] = sortedLocations.map((location) => {
        let provinceName = '';
        
        // Determine province name for display
        if (location.type !== 'provinsi' && location.parent_id) {
          const parentLocation = popularLocations.find(p => p.id === location.parent_id);
          if (parentLocation) {
            if (parentLocation.type === 'provinsi') {
              provinceName = parentLocation.name;
            } else if (parentLocation.parent_id) {
              const grandParentLocation = popularLocations.find(gp => gp.id === parentLocation.parent_id);
              provinceName = grandParentLocation?.name || '';
            }
          }
        } else if (location.type === 'provinsi') {
          provinceName = 'Indonesia'; // For top-level provinces
        }
        
        // Find matching image data or use default
        const imageData = locationImagesData.find(img => img.slug === location.slug) || locationImagesData.find(img => img.slug === 'default');

        return {
          slug: location.slug,
          name: location.name,
          province: provinceName,
          coordinates: location.coordinates || undefined,
          images: imageData ? imageData.images : [], // Use images from the matched data
        };
      });
      
      setLocations(locationsWithImages);
    } catch (error) {
      console.error('Error fetching popular locations:', error);
      // Fallback to empty array
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-accent mb-2">
              Lokasi Populer
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Jelajahi properti di lokasi-lokasi strategis dan berkembang di seluruh Indonesia
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (locations.length === 0) {
    return null; // Don't show section if no locations
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-accent mb-2">
            Lokasi Populer
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Jelajahi properti di lokasi-lokasi strategis dan berkembang di seluruh Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured location (larger card) */}
          {locations.length > 0 && (
            <div className="md:col-span-2 md:row-span-2"> {/* Removed fixed height here, let LocationGalleryCard manage */}
              <LocationGalleryCard 
                locationData={locations[0]}
                propertyCount={locations[0].propertyCount || 0} // Pass propertyCount from fetched data
              />
            </div>
          )}
          
          {/* Secondary locations */}
          {locations.slice(1, 3).map((location, index) => (
            <div key={location.slug} className="h-[200px]"> {/* Maintain height for smaller cards */}
              <LocationGalleryCard 
                locationData={location}
                propertyCount={location.propertyCount || 0}
              />
            </div>
          ))}
          
          {/* Additional locations */}
          {locations.slice(3).map((location, index) => (
            <div key={location.slug} className="h-[200px]"> {/* Maintain height for smaller cards */}
              <LocationGalleryCard 
                locationData={location}
                propertyCount={location.propertyCount || 0}
              />
            </div>
          ))}
        </div>
        
        {/* View all locations link */}
        <div className="mt-8 text-center">
          <Link 
            to="/lokasi" 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Lihat semua lokasi
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularLocations;

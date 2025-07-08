import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { locationService } from '../../services/locationService';

interface LocationCardProps {
  name: string;
  province: string;
  image: string; // This will now be the resolved image URL (from DB or fallback)
  propertyCount: number;
  slug: string;
  averageRating?: number;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  province,
  image,
  propertyCount,
  slug,
  averageRating
}) => {
  return (
    <Link
      to={`/lokasi/${slug}`}
      className="relative overflow-hidden rounded-2xl group h-full"
      aria-label={`Lihat properti di ${name}, ${province}`}
    >
      <img
        src={image}
        alt={`Properti di ${name}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300 flex flex-col justify-end p-5">
        <h3 className="font-heading text-white font-semibold text-xl mb-1 transform group-hover:translate-y-0 transition-transform duration-300">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-200 text-sm">{province}</p>
            <p className="text-white text-sm">{propertyCount.toLocaleString()} properti</p>
            <p className="text-neutral-200 text-sm">Rating: {averageRating ? `${averageRating.toFixed(1)}/5` : 'N/A'}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 translate-x-4">
            <ArrowRight className="text-primary" size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const PopularLocations: React.FC = () => {
  const [locations, setLocations] = useState<LocationCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPopularLocations();
  }, []);

  const fetchPopularLocations = async () => {
    setIsLoading(true);
    try {
      const popularLocations = await locationService.getAllLocations(
        { isActive: true },
        { column: 'property_count', ascending: false },
        10
      );

      const locationWithParents = await Promise.all(popularLocations.map(async (location) => {
        let provinceName = '';

        if (location.type !== 'provinsi' && location.parentId) {
          if (location.type === 'kota') {
            const province = popularLocations.find(p => p.id === location.parentId);
            provinceName = province?.name || '';
          }
          else if (location.type === 'kecamatan') {
            const city = popularLocations.find(c => c.id === location.parentId);
            if (city && city.parentId) {
              const province = popularLocations.find(p => p.id === city.parentId);
              provinceName = province?.name || '';
            }
          }
        } else if (location.type === 'provinsi') {
          provinceName = 'Indonesia';
        }

        // Fallback image if image_url is not available from the database
        const defaultImage = 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg';
        const imageUrl = location.image_url || defaultImage; // MODIFIED LINE

        return {
          name: location.name,
          province: provinceName,
          image: imageUrl, // MODIFIED LINE
          propertyCount: location.property_count || 0, // MODIFIED LINE
          slug: location.slug,
          averageRating: 4.5
        };
      }));

      setLocations(locationWithParents);
    } catch (error) {
      console.error('Error fetching popular locations:', error);
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
            <div className="md:col-span-2 md:row-span-2 h-[400px] md:h-auto">
              <LocationCard 
                name={locations[0].name}
                province={locations[0].province}
                image={locations[0].image}
                propertyCount={locations[0].propertyCount}
                slug={locations[0].slug}
              />
            </div>
          )}
          
          {/* Secondary locations */}
          {locations.slice(1, 3).map((location, index) => (
            <div key={location.slug} className="h-[200px]">
              <LocationCard 
                name={location.name}
                province={location.province}
                image={location.image}
                propertyCount={location.propertyCount}
                slug={location.slug}
              />
            </div>
          ))}
          
          {/* Additional locations */}
          {locations.slice(3).map((location, index) => (
            <div key={location.slug} className="h-[200px]">
              <LocationCard 
                name={location.name}
                province={location.province}
                image={location.image}
                propertyCount={location.propertyCount}
                slug={location.slug}
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
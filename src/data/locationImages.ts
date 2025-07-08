export interface LocationImageData {
  slug: string;
  name: string; // Location name
  province: string; // Province name
  coordinates?: { latitude: number; longitude: number; };
  images: {
    url: string;
    alt: string;
    attribution?: string; // e.g., "Photo by [Photographer] on Pexels"
  }[];
}

export const locationImagesData: LocationImageData[] = [
  {
    slug: 'jakarta-selatan',
    name: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    coordinates: { latitude: -6.2615, longitude: 106.8106 },
    images: [
      { url: 'https://images.pexels.com/photos/2437856/pexels-photo-2437856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Modern building in Jakarta Selatan', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Jakarta cityscape at night', attribution: 'Photo by Iqbal Nuril Anwar on Pexels' },
      { url: 'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Jakarta cityscape at night', attribution: 'Photo by Iqbal Nuril Anwar on Pexels' },
      { url: 'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Jakarta cityscape at night', attribution: 'Photo by Iqbal Nuril Anwar on Pexels' },
      { url: 'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Jakarta cityscape at night', attribution: 'Photo by Iqbal Nuril Anwar on Pexels' },
      { url: 'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Jakarta cityscape at night', attribution: 'Photo by Iqbal Nuril Anwar on Pexels' },
      { url: 'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Jakarta cityscape at night', attribution: 'Photo by Iqbal Nuril Anwar on Pexels' },
      { url: 'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Jakarta cityscape at night', attribution: 'Photo by Iqbal Nuril Anwar on Pexels' },
    ]
  },
  {
    slug: 'bandung',
    name: 'Bandung',
    province: 'Jawa Barat',
    coordinates: { latitude: -6.9175, longitude: 107.6191 },
    images: [
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
      { url: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bandung city view', attribution: 'Photo by Fikri Rasyid on Pexels' },
    ]
  },
  {
    slug: 'surabaya',
    name: 'Surabaya',
    province: 'Jawa Timur',
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    images: [
      { url: 'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Surabaya city skyline', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Surabaya city skyline', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Surabaya city skyline', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Surabaya city skyline', attribution: 'Photo by Pixabay on Pexels' },
    ]
  },
  {
    slug: 'bali',
    name: 'Bali',
    province: 'Bali',
    coordinates: { latitude: -8.3405, longitude: 115.0920 },
    images: [
      { url: 'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bali rice fields', attribution: 'Photo by Artem Beliaikin on Pexels' },
      { url: 'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bali rice fields', attribution: 'Photo by Artem Beliaikin on Pexels' },
      { url: 'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bali rice fields', attribution: 'Photo by Artem Beliaikin on Pexels' },
      { url: 'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Bali rice fields', attribution: 'Photo by Artem Beliaikin on Pexels' },
    ]
  },
  {
    slug: 'yogyakarta',
    name: 'Yogyakarta',
    province: 'DI Yogyakarta',
    coordinates: { latitude: -7.7956, longitude: 110.3695 },
    images: [
      { url: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Yogyakarta temple', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Yogyakarta temple', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Yogyakarta temple', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Yogyakarta temple', attribution: 'Photo by Pixabay on Pexels' },
    ]
  },
  {
    slug: 'semarang',
    name: 'Semarang',
    province: 'Jawa Tengah',
    coordinates: { latitude: -6.9922, longitude: 110.4203 },
    images: [
      { url: 'https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Semarang city view', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Semarang city view', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Semarang city view', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Semarang city view', attribution: 'Photo by Pixabay on Pexels' },
    ]
  },
  {
    slug: 'medan',
    name: 'Medan',
    province: 'Sumatera Utara',
    coordinates: { latitude: 3.5952, longitude: 98.6722 },
    images: [
      { url: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Medan city street', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Medan city street', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Medan city street', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Medan city street', attribution: 'Photo by Pixabay on Pexels' },
    ]
  },
  {
    slug: 'makassar',
    name: 'Makassar',
    province: 'Sulawesi Selatan',
    coordinates: { latitude: -5.1477, longitude: 119.4327 },
    images: [
      { url: 'https://images.pexels.com/photos/2111766/pexels-photo-2111766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Makassar port', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2111766/pexels-photo-2111766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Makassar port', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2111766/pexels-photo-2111766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Makassar port', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/2111766/pexels-photo-2111766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Makassar port', attribution: 'Photo by Pixabay on Pexels' },
    ]
  },
  {
    slug: 'default', // Fallback for any location not explicitly listed
    name: 'Indonesia',
    province: 'Generic',
    images: [
      { url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Generic Indonesian landscape', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Generic Indonesian landscape', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Generic Indonesian landscape', attribution: 'Photo by Pixabay on Pexels' },
      { url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', alt: 'Generic Indonesian landscape', attribution: 'Photo by Pixabay on Pexels' },
    ]
  }
];

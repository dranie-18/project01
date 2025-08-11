import React from 'react';
import { Check, X, Crown, Star, Image, Calendar, BarChart, Eye, Headphones, Share2 } from 'lucide-react';

const PremiumComparisonTable: React.FC = () => {
  const features = [
    {
      category: 'Visibilitas',
      items: [
        {
          name: 'Penempatan Hasil Pencarian',
          standard: 'Urutan biasa',
          premium: 'Unggulan di atas',
          icon: Star
        },
        {
          name: 'Highlight Iklan',
          standard: 'Border standar',
          premium: 'Border emas yang disorot',
          icon: Crown
        },
        {
          name: 'Unggulan di Beranda',
          standard: false,
          premium: true,
          icon: Star
        }
      ]
    },
    {
      category: 'Media & Konten',
      items: [
        {
          name: 'Galeri Foto',
          standard: 'Hingga 10 gambar',
          premium: 'Hingga 20 gambar',
          icon: Image
        },
        {
          name: 'Tur Virtual',
          standard: false,
          premium: true,
          icon: Eye
        },
        {
          name: 'Upload Video',
          standard: false,
          premium: true,
          icon: Eye
        }
      ]
    },
    {
      category: 'Durasi & Analitik',
      items: [
        {
          name: 'Durasi Iklan',
          standard: '14 hari',
          premium: '30 hari',
          icon: Calendar
        },
        {
          name: 'Dashboard Analitik',
          standard: false,
          premium: true,
          icon: BarChart
        },
        {
          name: 'Wawasan Kinerja',
          standard: false,
          premium: true,
          icon: BarChart
        }
      ]
    },
    {
      category: 'Dukungan & Promosi',
      items: [
        {
          name: 'Dukungan Pelanggan',
          standard: 'Dukungan standar',
          premium: 'Dukungan prioritas',
          icon: Headphones
        },
        {
          name: 'Promosi Media Sosial',
          standard: false,
          premium: true,
          icon: Share2
        },
        {
          name: 'Email Marketing',
          standard: false,
          premium: true,
          icon: Share2
        }
      ]
    }
  ];

  const renderFeatureValue = (value: string | boolean, isPremium: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className={`flex items-center justify-center ${isPremium ? 'text-yellow-600' : 'text-green-600'}`}>
          <Check size={20} />
        </div>
      ) : (
        <div className="flex items-center justify-center text-neutral-400">
          <X size={20} />
        </div>
      );
    }
    return (
      <div className={`text-center ${isPremium ? 'text-yellow-700 font-semibold' : 'text-neutral-600'}`}>
        {value}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-neutral-50 to-yellow-50 p-6 border-b">
        <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">
          Pilih Paket Iklan Anda
        </h2>
        <p className="text-center text-neutral-600">
          Bandingkan fitur dan pilih paket yang paling cocok untuk properti Anda
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold text-neutral-700">Fitur</th>
              <th className="text-center p-4 w-48">
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold text-neutral-700 mb-1">Standar</div>
                  <div className="text-2xl font-bold text-neutral-800">Gratis</div>
                  <div className="text-sm text-neutral-500">Fitur iklan dasar</div>
                </div>
              </th>
              <th className="text-center p-4 w-48 bg-gradient-to-b from-yellow-50 to-yellow-100">
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-lg font-bold text-yellow-700 mb-1">
                    <Crown size={20} className="mr-2" />
                    Premium
                  </div>
                  <div className="text-2xl font-bold text-yellow-800">$29.99</div>
                  <div className="text-sm text-yellow-600">per bulan</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="bg-neutral-50">
                  <td colSpan={3} className="p-4 font-semibold text-neutral-700 border-b">
                    {category.category}
                  </td>
                </tr>
                {category.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <tr key={itemIndex} className="border-b hover:bg-neutral-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <Icon size={16} className="mr-3 text-neutral-500" />
                          <span className="font-medium text-neutral-700">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {renderFeatureValue(item.standard)}
                      </td>
                      <td className="p-4 bg-yellow-50/50">
                        {renderFeatureValue(item.premium, true)}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border-t">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Siap meningkatkan visibilitas properti Anda?
          </h3>
          <p className="text-yellow-700 mb-4">
            Iklan premium mendapat rata-rata 3x lebih banyak tampilan dan 2x lebih banyak pertanyaan
          </p>
          <div className="flex justify-center space-x-4">
            <button className="btn-secondary">
              Lanjutkan dengan Standar
            </button>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center">
              <Crown size={20} className="mr-2" />
              Upgrade ke Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumComparisonTable;
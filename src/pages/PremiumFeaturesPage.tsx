import React from 'react';
import Layout from '../components/layout/Layout';
import { 
  Crown, 
  Star, 
  Image, 
  Calendar, 
  BarChart, 
  Eye, 
  Headphones, 
  Share2,
  TrendingUp,
  Users,
  MapPin,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PremiumFeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Star,
      title: 'Penempatan Unggulan',
      description: 'Properti Anda muncul di bagian atas hasil pencarian, memberikan visibilitas maksimal.',
      benefits: ['3x lebih banyak dilihat', 'Tingkat klik yang lebih tinggi', 'Peningkatan pertanyaan'],
      color: 'bg-blue-500'
    },
    {
      icon: Crown,
      title: 'Lencana & Gaya Premium',
      description: 'Tampil menonjol dengan border emas dan lencana premium yang menarik perhatian.',
      benefits: ['Tampilan profesional', 'Membangun kepercayaan', 'Membedakan dari kompetitor'],
      color: 'bg-yellow-500'
    },
    {
      icon: Image,
      title: 'Galeri Foto Diperluas',
      description: 'Unggah hingga 20 gambar berkualitas tinggi untuk menampilkan setiap detail properti Anda.',
      benefits: ['Showcase yang lebih komprehensif', 'Keterlibatan pembeli yang lebih baik', 'Mengurangi kebutuhan kunjungan fisik'],
      color: 'bg-green-500'
    },
    {
      icon: Calendar,
      title: 'Durasi Diperpanjang',
      description: 'Iklan Anda tetap aktif selama 30 hari alih-alih standar 14 hari.',
      benefits: ['Waktu eksposur lebih lama', 'ROI yang lebih baik', 'Lebih banyak calon pembeli'],
      color: 'bg-purple-500'
    },
    {
      icon: Eye,
      title: 'Integrasi Tur Virtual',
      description: 'Tambahkan tur virtual 360° dan video walkthrough untuk memberikan pengalaman imersif kepada pembeli.',
      benefits: ['Kemampuan melihat jarak jauh', 'Lead yang berkualitas', 'Presentasi modern'],
      color: 'bg-indigo-500'
    },
    {
      icon: BarChart,
      title: 'Analitik Terperinci',
      description: 'Lacak tampilan, pertanyaan, favorit, dan tingkat konversi dengan wawasan komprehensif.',
      benefits: ['Pelacakan kinerja', 'Wawasan optimisasi', 'Pengukuran ROI'],
      color: 'bg-red-500'
    },
    {
      icon: Headphones,
      title: 'Dukungan Prioritas',
      description: 'Dapatkan dukungan pelanggan khusus dengan waktu respons lebih cepat dan bantuan prioritas.',
      benefits: ['Akses dukungan 24/7', 'Resolusi masalah lebih cepat', 'Manajer akun khusus'],
      color: 'bg-teal-500'
    },
    {
      icon: Share2,
      title: 'Promosi Media Sosial',
      description: 'Properti Anda dipromosikan di seluruh saluran media sosial kami untuk eksposur tambahan.',
      benefits: ['Jangkauan lebih luas', 'Bukti sosial', 'Visibilitas lintas platform'],
      color: 'bg-pink-500'
    }
  ];

  const stats = [
    { number: '3.2x', label: 'Lebih Banyak Dilihat', description: 'Iklan premium mendapat visibilitas yang jauh lebih tinggi' },
    { number: '2.1x', label: 'Pertanyaan Lebih Tinggi', description: 'Lead berkualitas lebih baik dan pembeli yang lebih serius' },
    { number: '85%', label: 'Penjualan Lebih Cepat', description: 'Properti premium terjual lebih cepat dari iklan standar' },
    { number: '30', label: 'Hari Aktif', description: 'Durasi iklan diperpanjang untuk eksposur maksimal' }
  ];

  const testimonials = [
    {
      name: 'Sarah Wijaya',
      role: 'Pemilik Properti',
      content: 'Iklan premium saya mendapat 5x lebih banyak tampilan dan terjual dalam 2 minggu. Analitiknya membantu saya memahami perilaku pembeli.',
      rating: 5
    },
    {
      name: 'Michael Tanoto',
      role: 'Agen Properti',
      content: 'Fitur tur virtual dan penempatan premium membuat semua perbedaan. Klien menyukai presentasi yang profesional.',
      rating: 5
    },
    {
      name: 'Lisa Sari',
      role: 'Investor Properti',
      content: 'Dukungan prioritas dan analitik terperinci memberikan keunggulan yang saya butuhkan. Sangat berharga untuk penjual serius.',
      rating: 5
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Premium Features | Properti Pro</title>
        <meta name="description" content="Discover premium features that boost your property visibility by 3x. Get featured placement, analytics, virtual tours, and priority support." />
        <meta name="keywords" content="premium property listing, featured placement, property analytics, virtual tours, real estate marketing" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Crown size={64} className="text-yellow-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fitur Iklan Properti Premium
            </h1>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Tingkatkan visibilitas properti Anda hingga 3x dengan fitur premium kami. Dapatkan lebih banyak tampilan, 
              lead yang lebih baik, dan jual lebih cepat dengan alat profesional dan eksposur yang ditingkatkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-yellow-600 font-semibold py-4 px-8 rounded-lg hover:bg-yellow-50 transition-colors">
                Mulai Iklan Premium
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-yellow-600 transition-colors">
                Lihat Harga
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-neutral-800 mb-2">{stat.label}</div>
                <div className="text-sm text-neutral-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Semua yang Anda Butuhkan untuk Menjual Lebih Cepat
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Fitur premium kami dirancang untuk memberikan eksposur maksimal pada properti Anda 
              dan membantu Anda terhubung dengan pembeli serius dengan cepat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-neutral-700">
                        <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Cara Kerja Iklan Premium
            </h2>
            <p className="text-lg text-neutral-600">
              Mulai dengan fitur premium hanya dalam beberapa langkah sederhana
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Choose Premium</h3>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Pilih Premium</h3>
                <p className="text-neutral-600">
                  Pilih opsi upgrade premium saat membuat atau mengedit iklan properti Anda.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Pembayaran Aman</h3>
                <p className="text-neutral-600">
                  Selesaikan pembayaran Anda dengan aman melalui integrasi Xendit kami dengan berbagai opsi pembayaran.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Langsung Aktif</h3>
                <p className="text-neutral-600">
                  Iklan premium Anda langsung aktif dengan fitur yang ditingkatkan dan penempatan teratas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Apa Kata Pengguna Premium Kami
            </h2>
            <p className="text-lg text-neutral-600">
              Hasil nyata dari pemilik properti yang upgrade ke premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-neutral-800">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Siap Meningkatkan Visibilitas Properti Anda?
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Bergabunglah dengan ribuan penjual properti sukses yang memilih iklan premium. 
              Dapatkan 3x lebih banyak tampilan dan jual lebih cepat dengan fitur yang ditingkatkan.
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 mb-8">
              <div className="text-4xl font-bold mb-2">$29.99</div>
              <div className="text-yellow-100">per bulan • iklan 30 hari</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-yellow-600 font-semibold py-4 px-8 rounded-lg hover:bg-yellow-50 transition-colors flex items-center justify-center">
                <Crown size={20} className="mr-2" />
                Upgrade ke Premium
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-yellow-600 transition-colors flex items-center justify-center">
                Lihat Semua Fitur
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>

            <div className="mt-8 text-sm text-yellow-100">
              <p>✓ Garansi uang kembali 30 hari • ✓ Batal kapan saja • ✓ Tanpa biaya setup</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PremiumFeaturesPage;
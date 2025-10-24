/** @type {import('next').NextConfig} */
const nextConfig = {
  // Możesz tu mieć inne konfiguracje...

  // Dodaj ten fragment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Tutaj wklej hostname z Twojego komunikatu błędu
        hostname: 'yzjgutksjtrgmtrkgoiz.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**', // To pozwala na ładowanie obrazów z dowolnego publicznego bucketa
      },
    ],
  },
};

module.exports = nextConfig;
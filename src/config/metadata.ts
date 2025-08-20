import type { Metadata } from 'next'

interface MetadataConfig {
  [key: string]: Metadata
}

export const METADATA: MetadataConfig = {
  global: {
      title: {
        template: '%s | Haircut Barbershop',
        default: 'Haircut Barbershop | Home', // Used when a page doesn't provide its own title
      },
      category: 'barbershop',
      description: 'Your one-stop barbershop for all your grooming needs. From classic haircuts to modern styles, we have it all.',
      keywords: ['barbershop', 'haircut', 'shaving', 'beard trim', 'hairstyling', 'men\'s grooming', 'fade', 'undercut', 'hair care', 'barber'],
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
          { url: '/icon.png', sizes: '96x96', type: 'image/png' },
          { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
          
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      manifest: '/site.webmanifest',
      // Open Graph protocol for social media sharing
      openGraph: {
        title: "the Haircut Barbershop | Professional Haircuts & Grooming",
        description:  "Look and feel your best with a fresh haircut from our skilled barbers. Book your appointment today!",
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        siteName: "Haircut Barbershop",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/img/modern-vintage-barbershop.png`,
            width: 1024,
            height: 1024,
            alt: "the Haircut Barbershop - Fresh Cuts & Styles",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      // Landing page specific Twitter Card
      twitter: {
        title: 'Haircut Barbershop | Best Haircuts & Shaves',
        description: 'Get the perfect cut and style at our professional barbershop. Book your appointment online now.',
        card: "summary_large_image",
        creator: "@tonyfranky",
        images: ['/img/modern-vintage-barbershop.png'],
      },
      formatDetection: {
          email: false,
          address: false,
          telephone: false,
      },
      // Robots directives
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      facebook: {
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string,
      },
      // Verification for search console
      verification: {
        google: "",
        yandex: "",
      },
      other: {
        "msvalidate.01": '',
        "p:domain_verify": '',

      },
    
      // App link metadata (if applicable)
      // appLinks: {
      //   ios: {
      //     url: "https://yourapp.com/ios",
      //     appStoreId: "123456789",
      //   },
      //   android: {
      //     package: "com.yourapp.android",
      //     url: "https://yourapp.com/android",
      //   },
      // },
    
      // Additional metadata
      authors: [{ 
          name: "TinoKarya", 
          url: "https://barbershop-landingpage-puce.vercel.app/" }],
      creator: 'TinoKarya',
      publisher: 'TinoKarya',
  },
  default: {
    // Basic metadata
    title: "Best Barbershop in Town",
    // 150-160 characters. Include relevant keywords naturally while focusing on value proposition
    description: "Look your best with a fresh cut from our expert barbers. We specialize in classic and modern haircuts, shaves, and beard trims.",
    
    // Additional metadata
    keywords: [
      'barbershop', 
      'haircut',
      'men\'s haircut',
      'beard trim', 
      'shaving',
      'men\'s grooming', 
      'fade', 
      'classic haircut', 
      'professional barber', 
      'hair care'
    ],
  
  
    // Canonical URL 
    alternates: {
      canonical: "https://barbershop-landingpage-puce.vercel.app/",
    },
  },
  about: {
      title: "About Us | Haircut Barbershop",
      description: "Learn about our team of expert barbers and our commitment to quality service.",
      keywords: ["about us", "our story", "barber team"],
  }
  // Add more page entries
};
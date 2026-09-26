'use client'
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import HeroSection from './_sections/hero';
import FloatingChatButton from '@/components/chat-us';
import BackgroundAudio from '../src/components/backgroundAudio';

// Lazy load all sections except Hero (which is above the fold)
const FeaturedHaircuts = dynamic(() => import('./_sections/featured-hairstyles'), { ssr: false });
const OurBarbers = dynamic(() => import('./_sections/our-barber'), { ssr: false });
const OurServices = dynamic(() => import('./_sections/our-service'), { ssr: false });
const Gallery = dynamic(() => import('./_sections/gallery'), { ssr: false });
const Testimonials = dynamic(() => import('./_sections/testimonial'), { ssr: false });
const FAQSection = dynamic(() => import('./_sections/faq'), { ssr: false });
const Newsletter = dynamic(() => import('./_sections/newsletter'), { ssr: false });
const ContactUs = dynamic(() => import('./_sections/contact-us'), { ssr: false });

// Placeholder component for loading states
const SectionPlaceholder = ({ minHeight = 300 }: { minHeight?: number }) => (
  <div 
    className="w-full bg-gray-800 rounded-xl animate-pulse" 
    style={{ minHeight: `${minHeight}px` }}
  />
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="flex flex-col justify-center flex-1 py-5 mx-auto w-full px-4 sm:px-6 md:px-8 max-w-240">
        <div className="w-full space-y-16 layout-content-container">
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <FeaturedHaircuts />
          </Suspense>
          
          <Suspense fallback={<SectionPlaceholder minHeight={500} />}>
            <OurBarbers />
          </Suspense>
          
          <Suspense fallback={<SectionPlaceholder minHeight={600} />}>
            <OurServices />
          </Suspense>
          
          <Suspense fallback={<SectionPlaceholder minHeight={500} />}>
            <Gallery />
          </Suspense>
          
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<SectionPlaceholder minHeight={500} />}>
            <FAQSection />
          </Suspense>
          
          <Suspense fallback={<SectionPlaceholder minHeight={600} />}>
            <Newsletter />
          </Suspense>
          
          <Suspense fallback={<SectionPlaceholder minHeight={600} />}>
            <ContactUs />
          </Suspense>

          <FloatingChatButton />
        </div>
      </div>
      <BackgroundAudio />
    </>
  )
}
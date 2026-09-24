import React, { Suspense, lazy } from 'react';
import HeroSection from './_sections/hero';
import FloatingChatButton from '@/components/chat-us';
// Lazy load all sections except Hero (which is above the fold)
const FeaturedHaircuts = lazy(() => import('./_sections/featured-hairstyles'));
const OurBarbers = lazy(() => import('./_sections/our-barber'));
const OurServices = lazy(() => import('./_sections/our-service'));
const Gallery = lazy(() => import('./_sections/gallery'));
const Testimonials = lazy(() => import('./_sections/testimonial'));
const FAQSection = lazy(() => import('./_sections/faq'));
const Newsletter = lazy(() => import('./_sections/newsletter'));
const ContactUs = lazy(() => import('./_sections/contact-us'));

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
      <div className="flex flex-col justify-center flex-1 py-5 mx-auto w-full px-4 sm:px-6 md:px-8 max-w-[960px]">
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
    </>
  )
}
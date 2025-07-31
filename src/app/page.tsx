import React from 'react';
import HeroSection from '@/components/sections/hero';
import FeaturedHaircuts from '@/components/sections/features';
import OurBarbers from '@/components/sections/our-barber';
import OurServices from '@/components/sections/our-service';
import Gallery from '@/components/sections/gallery';
import Testimonials from '@/components/sections/testimonial';
import FAQSection from '@/components/sections/faq';
import ContactUs from '@/components/sections/contact-us';
import FloatingChatButton from '@/components/chat-us';

// For App Router: export default function Page() { ... }
// For Pages Router: export default function Home() { ... }

export default function Home() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <HeroSection />
        <FeaturedHaircuts />
        <OurBarbers />
        <OurServices />
        <Gallery />
        <Testimonials />
        <FAQSection />
        <ContactUs />
        <FloatingChatButton />
        {/* You can add a Footer component here if you have one */}
      </div>
    </div>
  )
}
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"

type ImageProps = {
  src: string;
  alt: string;
};

type Slide = {
  image: string;
  title: string;
  subtitle: string;
};

const defaultSlides = [
  {
    title: "Crafting Confidence, One Cut at a Time",
    subtitle: "Experience the art of grooming at The HairCut, where skilled barbers blend tradition with modern style."
  },
  {
    title: "Master Craftsmanship Awaits",
    subtitle: "Where precision meets passion. Every cut tells a story of dedication and artistry."
  },
  {
    title: "Vintage Style, Modern Edge",
    subtitle: "Step into our world where classic techniques meet contemporary trends."
  },
  {
    title: "Your Style, Our Expertise",
    subtitle: "Professional grooming services tailored to your unique personality and lifestyle."
  }
];

async function getHeroImages(): Promise<ImageProps[]> {
  try {
    const response = await fetch('/api/hero-images');
    if (!response.ok) throw new Error('Failed to fetch hero images');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch hero images:', error);
    return [];
  }
}

function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [loading, setLoading] = useState(true);

  // Load images from API route
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const heroImages = await getHeroImages();
        
        if (heroImages.length > 0) {
          const loadedSlides = heroImages.map((image, index) => ({
            image: image.src,
            ...defaultSlides[index % defaultSlides.length]
          }));
          setSlides(loadedSlides);
        } else {
          // Fallback to default slides with placeholder images
          setSlides(defaultSlides.map(slide => ({
            ...slide,
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          })));
        }
      } catch (error) {
        console.error('Error loading images:', error);
        setSlides(defaultSlides.map(slide => ({
          ...slide,
          image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        })));
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, []);

  // Handle carousel API
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      if (newIndex !== currentSlide) {
        setIsTransitioning(true);
        setCurrentSlide(newIndex);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    });
  }, [api, currentSlide]);

  // Auto-advance carousel
  useEffect(() => {
    if (!api || loading || slides.length === 0) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api, loading, slides.length]);

  const goToSlide = useCallback((index: number) => {
    if (!api || isTransitioning || index === currentSlide) return;
    api.scrollTo(index);
  }, [api, isTransitioning, currentSlide]);

  // Show loading state while images are being loaded
  if (loading) {
    return (
      <div className="@container w-full">
        <div className="@[480px]:p-0">
          <Card className="w-full bg-gray-900 border-0">
            <CardContent className="flex min-h-[480px] flex-col gap-6 items-center justify-center p-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f3c334]"></div>
              <p className="text-sm text-white">Loading hero images...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="@container h-screen relative w-full">
      <div className="@[480px]:p-0">
        <Carousel 
          setApi={setApi}
          className="w-full h-screen overflow-hidden shadow-2xl"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="relative">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="relative">
                <div className="relative min-h-[480px] w-full h-screen overflow-hidden">
                  {/* Background Image with Gradient Light Effect */}
                  <div 
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 scale-100 blur-0' 
                        : 'opacity-90 scale-110 blur-sm'
                    }`}
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.0) 30%),
                        /* Gradient light effect overlay */
                        radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%),
                        /* Golden spotlight effect */
                        radial-gradient(ellipse at center, rgba(243,195,52,0.2) 0%, rgba(0,0,0,0) 70%),
                        /* Dark overlay */
                        linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%),
                        /* Actual image */
                        url("${slide.image}")
                      `,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: isTransitioning ? 'blur(2px)' : 'blur(0px)',
                      transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />

                  {/* Liquid Displacement Overlay */}
                  <div 
                    className={`absolute inset-0 opacity-0 transition-all duration-300 ${
                      isTransitioning && index === currentSlide ? 'opacity-10' : 'opacity-0'
                    }`}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                      transform: isTransitioning && index === currentSlide ? 'translateX(100%)' : 'translateX(-100%)',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="relative z-10 flex min-h-[480px] flex-col gap-6 @[480px]:gap-8 items-center justify-center p-4">
                    <div 
                      className={`max-w-xl pt-40 flex font-bebas flex-col gap-2 text-center transition-all duration-500 ${
                        isTransitioning && index === currentSlide ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                      }`}
                    >
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal drop-shadow-md max-w-2xl">
                        {slide.subtitle}
                      </h2>
                    </div>
                    <Button
                      size="lg"
                      className="bg-[#f3c334] hover:bg-[#e6b82d] text-[#181611] font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-full px-6 @[480px]:px-8"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Arrows with Glassmorphism */}
          <CarouselPrevious className="text-white transition-all duration-300 border-0 left-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:text-white hover:scale-110" />
          <CarouselNext className="text-white transition-all duration-300 border-0 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:text-white hover:scale-110" />

          {/* Custom Slide Indicators */}
          <div className="absolute z-20 flex gap-3 -translate-x-1/2 bottom-6 left-1/2">
            {slides.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 p-0 rounded-full transition-all duration-300 border-0 ${
                  index === currentSlide 
                    ? 'bg-[#f3c334] scale-125 shadow-lg hover:bg-[#f3c334]' 
                    : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20 @[480px]:rounded-b-xl">
            <div 
              className="h-full bg-[#f3c334] opacity-75 transition-all duration-300 @[480px]:rounded-b-xl"
              style={{ 
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
                transition: isTransitioning ? 'width 0.3s ease-in-out' : 'width 5s linear'
              }}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default HeroSection;
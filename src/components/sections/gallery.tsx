'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";
import GalleryImage from '../cards/gallery-img';

async function getImages(): Promise<{src: string; alt: string}[]> {
  try {
    const response = await fetch('/api/gallery');
    if (!response.ok) throw new Error('Failed to fetch gallery images');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    return [];
  }
}

export default function Gallery() {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="px-4">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
          Gallery
        </h2>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
          <div className="w-full h-40 bg-gray-700 rounded animate-pulse mb-4" />
          <div className="w-full h-40 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex justify-center pb-5">
          <div className="w-32 h-10 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const imagesRowA = images.slice(0, Math.ceil(images.length / 2));
  const imagesRowB = images.slice(Math.ceil(images.length / 2));

  return (
    <div className="px-4">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
        Gallery
      </h2>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
        <ScrollVelocityContainer className="w-full">
          <ScrollVelocityRow baseVelocity={6} direction={1} className="py-4 grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            {imagesRowA.map((image, idx) => (
              <GalleryImage 
                key={`${image.src}-${idx}`} 
                imageUrl={image.src} 
                alt={image.alt} 
              />
            ))}
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4">
            {imagesRowB.map((image, idx) => (
              <GalleryImage 
                key={`${image.src}-${idx}`} 
                imageUrl={image.src} 
                alt={image.alt} 
              />
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
      <div className="flex justify-center pb-5">
        <Button asChild>
          <Link href="/gallery">
            See all images
          </Link>
        </Button>
      </div>
    </div>
  );
}
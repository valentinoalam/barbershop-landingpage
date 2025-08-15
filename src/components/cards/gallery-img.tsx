import React, { useState } from 'react';
import Image from 'next/image';

function GalleryImage({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
      <div className="mx-4 inline-block h-40 w-full object-cover shadow-sm relative overflow-hidden aspect-square rounded-xl">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
        )}
        <Image
          src={imageUrl}
          alt={alt || "Hairstyle example"}
          // width={240}
          // height={180}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
  );
}

export default GalleryImage;

import React from 'react';

function GalleryImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
    </div>
  );
}

export default GalleryImage;
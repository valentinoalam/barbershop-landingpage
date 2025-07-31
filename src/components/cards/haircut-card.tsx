import React from 'react';

function HaircutCard({ imageUrl, title, description }) {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
      <div
        className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
      <div>
        <p className="text-white text-base font-medium leading-normal">{title}</p>
        <p className="text-[#bab29c] text-sm font-normal leading-normal">{description}</p>
      </div>
    </div>
  );
}

export default HaircutCard;
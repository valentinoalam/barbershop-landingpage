import React from 'react';

function BarberCard({ imageUrl, name, specialization, instagramHandle }) {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-xl bg-[#27241b] shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-32 lg:min-w-40 pt-4">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-4/5"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4 text-center">
        <div>
          <p className="text-white text-base font-medium leading-normal">{name}</p>
          <p className="text-[#bab29c] text-sm font-normal leading-normal">{specialization} {instagramHandle && `Follow on Instagram: ${instagramHandle}`}</p>
        </div>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#393528] text-white text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Book Now</span>
        </button>
      </div>
    </div>
  );
}

export default BarberCard;
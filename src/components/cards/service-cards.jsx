import React from 'react';
import CheckIcon from '../common/check-icon'; // Adjust path as needed

function ServiceCard({ title, price, features }) {
  return (
    <div className="flex relative flex-1 flex-col gap-4 rounded-xl border border-solid border-[#544e3b] bg-[#27241b] p-6">
      <div className='absolute bottom-0 left-0 w-full h-full'><div className='halftone'></div></div>
      <div className="flex relative flex-col gap-1">
        <h1 className="text-white text-base font-bold leading-tight">{title}</h1>
        <span className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">{price}</span>
      </div>
      <button
        className="flex relative min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#393528] text-white text-sm font-bold leading-normal tracking-[0.015em]"
      >
        <span className="truncate">Book Now</span>
      </button>
      <div className="flex flex-col relative gap-2">
        {features.map((feature, index) => (
          <div key={index} className="text-[13px] font-normal leading-normal flex gap-3 text-white">
            <CheckIcon />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCard;
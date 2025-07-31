import React from 'react';
import LogoIcon from '../common/logo-icon'; // Adjust path as needed

function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#393528] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <LogoIcon />
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">The CutNeat</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-white text-sm font-medium leading-normal" href="#">Services</a>
          <a className="text-white text-sm leading-normal" href="#">Gallery</a>
          <a className="text-white text-sm font-medium leading-normal" href="#">Testimonials</a>
          <a className="text-white text-sm font-medium leading-normal" href="#">Contact</a>
        </div>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f3c334] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Book Now</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
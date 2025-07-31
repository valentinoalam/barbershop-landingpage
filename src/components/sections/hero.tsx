import React from 'react';

function HeroSection() {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
          style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkV46--sb31DQalsbbKwzyaCzxJOE0v6JMPmfljjVmcBsQFaIZ0IccS2tR-vB8qgqZvr0xvKy27qqpgP76oPX4A6YiifrkjfWapHixK5CSj8Rbl_ri2EjomjxTP8DC-Seaw_chLp6eK6ulhLZCUoZsAI4nHXZvOc3MTZ_Mpv2Wq7iTUVUxlcvceJFnulIoo6BTbVwxR4rPJY7bnyh6myZu1IH98XcotB1wUKUdRpqUNNVQQSh3v7QABaUiLYIqS9QiWzegRrxh3Xo")' }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
            >
              Crafting Confidence, One Cut at a Time
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Experience the art of grooming at The Sharp Edge, where skilled barbers blend tradition with modern style to create your perfect look.
            </h2>
          </div>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f3c334] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
          >
            <span className="truncate">Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
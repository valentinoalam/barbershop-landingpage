import React from 'react';
import HaircutCard from '../cards/haircut-card'; // Adjust path as needed

function FeaturedHaircuts() {
  const haircuts = [
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUoQy9jYYM8gfwMoWjqTNgMcMHCIu4NUw1znZpBJCPHL5TXZEkIccNIR96w7Vlq2GpDPQAGr8QBaLew1JwQsb4fshr3M9aT7ch9XZBgXR8akJvcsiu09ppPiqtLfPZcNuEHtsEDSbGqJlU5eRu6tsyGR4JMS0Hn2Xnab4U-r9mWfRvfB8ESh30DfklIkDzGsMZmYJxlpGotjNKv0GpH9qvankiGu5EoLMtdYdab-a6gIwbwe1BqA3sT7nU49R8AMXSAjeSWSJ3p0U",
      title: "The Classic Taper",
      description: "A timeless cut that suits any occasion.",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuACjIwWMJODub3q_m79xk3cFtC-7n-3eAYfjly5_s8JECQPY1XSvbK8J4WSVbV9MGr3iNf1Vv0lqCGAVofxHONdpCOVHcJptVNLyrYtySKQObHCBdz6JJ7Hs190ulDBq5livKWo8DPVGeTOmLSEk18xamJfgG9oWESrdbhAumX6j0tS97G_Mbt--vrX644ArO5seW4XRJcxRGTgNBoQxUfoe7Wo3aSI21NV3wwXCY4ASGbRa1uRW54iVdRcTF-0JGuyxJutOuTq7yw",
      title: "The Modern Pompadour",
      description: "A bold and stylish look for the modern man.",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA74ggqFr-QZpF7MTs8wNJgaFzMSwC3IOebmJUSSS4NpiWEiZ0hWR--z9WOf1uvNMhCukzSswxorL_Qs4iX8C_cQMIn1zKkMX43-rWRLuWFYaA66fujnp9huz0DOwe9FSMg2Bkml9FcNaRTiPhgwDa1eybQidGc9NS0V7Ip4iXjEyHpXpeNa5yYhnJUf7p7xXPV5ft2S21FIMx_YVAlri-ZE9Rdn1Jp1TBRFUSRU5wIpUp0FIsPIjJRftoxL2v39MwmcPkjSZpR8wU",
      title: "The Textured Crop",
      description: "A low-maintenance style with plenty of character.",
    },
  ];

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Haircuts</h2>
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          {haircuts.map((haircut, index) => (
            <HaircutCard
              key={index}
              imageUrl={haircut.imageUrl}
              title={haircut.title}
              description={haircut.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default FeaturedHaircuts;
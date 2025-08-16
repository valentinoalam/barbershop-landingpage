import React from 'react';
import ServiceCard from '../cards/service-cards'; // Adjust path as needed

function OurServices() {
  const services = [
    {
      title: "Classic Cut",
      price: "$35",
      features: ["Precision haircut", "Shampoo & condition", "Hot towel finish"],
    },
    {
      title: "Modern Fade",
      price: "$40",
      features: ["Fade or taper haircut", "Line up & edge", "Styling product"],
    },
    {
      title: "Beard Trim & Style",
      price: "$25",
      features: ["Beard shaping", "Hot towel treatment", "Beard oil application"],
    },
  ];

  return (
    <>
      <div className='text-5xl leading-tight mb-4 font-bold floating'>
        <h2 className="text-white text-4xl font-playfair font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Services</h2>
      </div>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#393528] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">Classic Cut</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#393528] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">Modern Fade</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#393528] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">Beard Trim & Style</p>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            price={service.price}
            features={service.features}
          />
        ))}
      </div>
    </>
  );
}

export default OurServices;
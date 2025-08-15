import React from 'react';
import BarberCard from '../cards/barber-card'; // Adjust path as needed

function OurBarbers() {
  const barbers = [
    {
      imageUrl: "/img/capster/michael-rodichev-IIpETIwh7Ig-unsplash.jpg",
      name: "Ethan Carter",
      specialization: "Specializes in classic cuts and beard trims.",
      instagramHandle: "@ethan_cuts",
    },
    {
      imageUrl: "/img/capster/gryffyn-m-U3OqRjxYiRQ-unsplash.jpg",
      name: "Liam Harper",
      specialization: "Expert in modern fades and styling.",
      instagramHandle: "@liam_styles",
    },
    {
      imageUrl: "/img/capster/zanyar-ibrahim-3bHgZ1ogvh8-unsplash.jpg",
      name: "Noah Bennett",
      specialization: "Known for precision haircuts and hot towel finishes.",
      instagramHandle: "@noah_sharp",
    },
  ];

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Barbers</h2>
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid items-stretch grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
          {barbers.map((barber, index) => (
            <BarberCard
              key={index}
              index={index}
              imageUrl={barber.imageUrl}
              name={barber.name}
              specialization={barber.specialization}
              instagramHandle={barber.instagramHandle}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default OurBarbers;
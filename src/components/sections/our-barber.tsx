import React from 'react';
import BarberCard from '../cards/barber-card'; // Adjust path as needed

function OurBarbers() {
  const barbers = [
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRiSr6L_BmGXP9DbABGza8csHFTllHhLGohSHqX1h-Imp_m2QSl-chbwbNwvMKoIz5d3hDc6Y4qkS8k56XlchxWhPOFFYqk_mOyI-MxlGzxeRPR-30C-15SFDAz0fzkM7WZaaRjzXIxsE0Os0UAB8nIqeVwcNk4doKqa1RE13kv9Dr7RrzKYIa-CYTrpmQaaRzqvqWHgMlZ4lM9soLEaCWjpqjL_spnhSOJ_I5jul0-xQU_pglVCfC2eyMxVHUiiC0TRb8RPN5TzQ",
      name: "Ethan Carter",
      specialization: "Specializes in classic cuts and beard trims.",
      instagramHandle: "@ethan_cuts",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8qUSdGNUGR9mDLwJV4Ej-gf4trKD2roPsTtRGi6jQCN3ZhVMEH0YzluLmJ1UVuirA8hfI1xz0dt7G8n9XX0duBkgt2_TYCt2Ap1tB0df1iW-xRf5MjyO-NWv6CSxqgRiCWWh3zi-cXWHaeSb6QxT53aUIQDkeWaoiYaE8Nyg8kPJyiNV87I9PjhGjlc-eLQiJ69oyLBvQM72v4ggS_Baa8byNk_s9nKA2T6dkw4RzmMcuph6xzgfGfJuJhWxIFu2EJoci5A-Y2jE",
      name: "Liam Harper",
      specialization: "Expert in modern fades and styling.",
      instagramHandle: "@liam_styles",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYwUN8RlL9dsEcX6uKY0DR2cIQWOlaXhfKTWjgsxg78_8rG9b7p9BX1xqEwwbQi-Ore-UcRG2k1TXI_h0it8jqWtXxpl8YzrmzFNdtKsXl4QNE-2bnb0CHZPHNqbvwtYzH9DduJo-hfMXjryzIw5PfTwNLgCU0f56roInl7_aX1_aCev8OENETME8SKCETF42AV5pXU2fFgdZsEt5SyMFGXwG_Mk5sWqfzL62U1G6w1_qOxrTUpAECPTU_OF03lNgCilEjGStq0ek",
      name: "Noah Bennett",
      specialization: "Known for precision haircuts and hot towel finishes.",
      instagramHandle: "@noah_sharp",
    },
  ];

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Barbers</h2>
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          {barbers.map((barber, index) => (
            <BarberCard
              key={index}
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
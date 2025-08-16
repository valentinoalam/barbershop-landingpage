'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
const teamData = [
  {
    name: "Alex Johnson",
    role: "Founder & Master Barber",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqyUhApudFQydTavtGvk2zGSSjperZM-1s5SXGo0ZEA8k_u9vZzxTnmI1KETWvzt3W_1D-ldzYORM93DW8OPmjXwrthDZ15tXMtxk7SiOcVqwQ9DfPTMvt2TVBckkHCq9JbpyjUKtaKMzzB-3WBRWUj1kxBu0nwv-0EfLoxQeGR6L4Hmk6GbZXHOKPPSovBlhowpvC5o0hQtqwDa1nynSRmXtymiVfQj3_1cGcDglVDRHwnaHDxLoJyvKEAdNLQPau6yLuMFlCxG4",
    description: "Visionary founder with over 15 years of experience in the barbering industry. Master of classic and modern cuts with a passion for creating the perfect look for every client. Alex opened the shop with a vision to bring traditional craftsmanship to modern style.",
    skills: ["Classic Cuts", "Beard Styling", "Hot Towel Shaves", "Business Leadership"],
    color: "blue",
    experience: "15+ years"
  },
  {
    name: "Chris Evans",
    role: "Co-Founder & Manager",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLV30RGN-87ihwJyGwemaNgDkjvGQg8UvoRT3_KXjxqZ3IoTD4K6vYepZKAaOeV0q86IYGNRRT3t-0v5ZSxsUbWPDMaeyDTUgcJJYgcAnGRlNa5XZhbGnTrmZlDsDCekqnd6L5XrU0AOrKyqhZuzr4vrgV7ZGbETXhRUz5XWU-xcQ1yT4zLlLB3dBuJ6kn_tt4B0lDWjFjSZoCPd8i5BrRRi3tqYG20pbfjOUPAvwKLssNRmPQCuwJr30g2J1TicuI5RSyUp2Q6es",
    description: "Business-minded co-founder who ensures smooth operations and exceptional customer service. Chris handles scheduling, client relations, and manages the day-to-day operations while maintaining the shop's welcoming atmosphere.",
    skills: ["Operations Management", "Customer Service", "Team Coordination", "Business Strategy"],
    color: "green",
    experience: "10+ years"
  },
  {
    name: "Sam Wilson",
    role: "Senior Barber",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8cHHKYKmiKQwN8oxyO9FpZLac5ulbIC_NlSOxDqeB8P3T3zNllTATHKG_TXylsOsr6dyGCxZySkaP013vQWre1szh14zFgoaugCD2Wmxdv7UUobMQb-4ccGvq7O1lqJT3gbpn5NwVZSYw-lI0zJz9U9_s6T2yK6-PGgSsbCy86oYUTuryNvSnTu5-IQ4MuGt4DaQOX1111a22yjmTVOAffXu5ybOyjXSNTi16VFgIz-E58IlsWE-QBzo-z1mTYnhb5m1o4MSoLGo",
    description: "Skilled senior barber known for precision cuts and attention to detail. Sam specializes in modern styles and has a loyal following of clients who trust him with their signature looks. Always staying current with the latest trends.",
    skills: ["Modern Cuts", "Fade Techniques", "Styling", "Client Consultation"],
    color: "purple",
    experience: "8+ years"
  }
];
const Page = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      pink: 'bg-pink-100 text-pink-800'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800';
  };
  return (
    <div className="relative flex flex-col mt-16 items-center justify-center overflow-hidden flex-1 py-5 h-full pb-20 mx-auto md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
      <div className="flex mt-8 max-w-10/12 flex-col items-center justify-between py-6 lg:flex-row">
        <div className="relative z-40 lg:max-w-xl lg:pr-5">
          <div className="absolute w-full top-0 z-0 opacity-50 left-60">
            <Image width={200} height={100} src="/logo/haircut-h.svg" className="z-0 object-fill bg-white h-full w-36 fill-y text-y " alt={''} />
          </div>
          <h1 className="flex uppercase mb-8 text-4xl font-black whitespace-pre text-amber-50">
              About <span className='text-yellow-500'>Us</span>
          </h1>
          
          <h2 className="max-w-lg mb-6 text-5xl text-accent-foreground font-light leading-snug tracking-tight text-g1 sm:text-7xl sm:leading-snug">
              We make you look
              <span
              className="inline-block px-4 my-1 font-bold bg-white border-b-8 border-g4 text-accent text-g4 animate__animated animate__flash">different</span>
          </h2>
          <div className="absolute z-0 -bottom-10 left-40 opacity-10">
            <svg width="800px" height="800px" viewBox="0 0 24 24"
              className="z-0 object-fill h-full text-gray-300 w-96 fill-gray-300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6V16C10 16.5523 10.4477 17 11 17C11.5523 17 12 16.5523 12 16V6ZM9 9C9 8.44772 8.55228 8 8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16V9ZM15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9V16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16V9ZM18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13V16C16 16.5523 16.4477 17 17 17C17.5523 17 18 16.5523 18 16V13ZM6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15V16C4 16.5523 4.44772 17 5 17C5.55228 17 6 16.5523 6 16V15ZM21 15C21 14.4477 20.5523 14 20 14C19.4477 14 19 14.4477 19 15V16C19 16.5523 19.4477 17 20 17C20.5523 17 21 16.5523 21 16V15ZM4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H4Z">
              </path>
            </svg>
          </div>
        </div>
        <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 p-2 mx-auto my-6 bg-white rounded-full animate-bounce lg:hidden" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
            </svg>
            <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
            <Image width={400} height={400} src="/img/capster/modern-vintage-barbershop.png" alt={''} />
            </div>
        </div>
      </div>
      

      <div className="absolute z-0 top-10 left-3/4 opacity-10">
        <svg fill="#0425f0" width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
          className="z-0 object-fill h-full text-blue-300 w-96 fill-blue-300">
          <path
            d="M230.704 99.2a4.004 4.004 0 0 0-4.01-3.995h-50.981c-2.215 0-5.212-1.327-6.693-2.964L155.289 77.08c-17.795-19.65-41.628-16.256-53.234 7.58l-38.736 79.557C60.42 170.172 52.705 175 46.077 175H29.359a3.996 3.996 0 0 0-3.994 3.995v10.01A4 4 0 0 0 29.372 193h24.7c8.835 0 19.208-6.395 23.174-14.293l43.645-86.914c3.964-7.894 12.233-9.228 18.473-2.974l17.184 17.219c3.123 3.13 9.242 5.667 13.647 5.667H226.7a4.005 4.005 0 0 0 4.004-3.994v-8.512z"
            fillRule="evenodd"></path>
          </svg>
      </div>
      <div className="layout-content-container max-w-10/12 relative flex flex-col flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Our Story</p>
        </div>
        <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          The Haircut began as a humble, single-chair barbershop in the heart of the city, founded by Alex Johnson, a passionate barber with a vision to create a space where
          quality haircuts meet community. Over the years, it has grown into a renowned establishment, known for its skilled barbers, welcoming atmosphere, and commitment to
          excellence. From its early days, The Haircut has been a place where stories are shared, friendships are forged, and every client leaves feeling their best.
        </p>
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Timeline</h2>
        <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
          <div className="flex flex-col items-center gap-1 pt-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxlri78xn0X0Wyfvo7--9Z5HnQjc2tpMr-Yd-OqUJDoJL-ff3NgC4VHR1ocSjJqWc4dpsnldCetcnJC87yP1_JOafPP8Ps9i_7tQG8Hepi_0-Iz1dZkZxAwhKZOvmmQWPf_dfP9g19xrqNx0PcCYjy9KaE5BqKgiCJhNLV49PS_VigrdQghtzMiBJEi8lfq_ARixxvpPEnwAi7qf1gTQKQxlhRbMquaFK5AM3XV_GucKN5GwxmenhLCtgR06qN4lk1DCeEo6M9oks")' }}
            ></div>
            <div className="w-[1.5px] bg-[#544e3b] h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-white text-base font-medium leading-normal">2015: The Beginning</p>
            <p className="text-[#bab29c] text-base font-normal leading-normal">
              Alex Johnson opens The Haircut, a small barbershop focused on classic cuts and personalized service.
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-[1.5px] bg-[#544e3b] h-2"></div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCneg-SCDwhagqXwfcnB8_DlK6snqakpol672LIwG0eVxOYTHjZpbFw9abjJ7RWXYt1ZNIBPTDZitqNZ6g6z6WAQUbYHGo918ed3wnwh-4nbClODZMBxPotDt3siS4TUE03bAG6XBdjZn6W1BiWjcmajPVhw2wK6uDvCWJNWDI8P387Y4o_zjQjGiYGUsan1fvz2QxZIgyoJzfyPIzfkhXBQkK63-3ekBqeRcJBrFxzmEC8BgmeGb71vzYCGVyaQreUKypceEoiYT0")' }}
            ></div>
            <div className="w-[1.5px] bg-[#544e3b] h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-white text-base font-medium leading-normal">2018: Expansion</p>
            <p className="text-[#bab29c] text-base font-normal leading-normal">
              The barbershop expands to a larger location, adding more chairs and barbers to meet growing demand.
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 pb-3">
            <div className="w-[1.5px] bg-[#544e3b] h-2"></div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAng0ZYvTxyoBIm4fK8uWoW5IB2Q6rbtT-PPyHql3TtiQX_HkXJeFKk_6UX_QdyZyoQn5hzXrzKVq74iC5aOM2CVnp08C9rg1FW6gA8r6SKRmjEbR29tG0D0J5ByDvh_w9KaxgEjV9cYxcMwgX9g2OK_HLz6fzsJgdclM3_OB7lJaA3LxTQL9Q_XR2eta6YBFV3ABSck0CZMPfMsb-y5PxblAJmzWGug2SimnHEMw5m_FsT0qJ9sGBwcIlBmN9_9APqlgC2ZSDsJZo")' }}
            ></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-white text-base font-medium leading-normal">2022: New Services</p>
            <p className="text-[#bab29c] text-base font-normal leading-normal">
              The Haircut introduces new services, including beard trims, hot towel shaves, and hair styling products.
            </p>
          </div>
        </div>
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Meet the <span className='font-black italic'>Founder</span></h2>
        <div className="grid md:grid-cols-3 gap-4 grid-cols-[repeat(auto-fit,minmax(158px,1fr))] p-4">
          {teamData.map((member, index) => (
            <div 
              key={index}
              className="flex flex-col gap-3 text-center pb-3 first:col-span-2 first:md:col-span-1 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/5 rounded-lg p-4"
              onClick={() => openModal(member)}
            >
              <div className="px-4">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full ring-4 ring-white/10 hover:ring-white/30 transition-all duration-300"
                  style={{ backgroundImage: `url("${member.avatar}")` }}
                ></div>
              </div>
              <div>
                <p className="text-white text-base font-medium leading-normal">{member.name}</p>
                <p className="text-[#bab29c] text-sm font-normal leading-normal">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className={`bg-white rounded-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
              isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMember && (
              <>
                {/* Modal Header */}
                <div className="relative p-6 pb-4">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-full ring-4 ring-gray-100 mb-4"
                      style={{ backgroundImage: `url("${selectedMember.avatar}")` }}
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
                    <span className={`inline-block px-4 py-2 ${getColorClasses(selectedMember.color)} rounded-full text-sm font-medium`}>
                      {selectedMember.role}
                    </span>
                    {selectedMember.experience && (
                      <p className="text-gray-500 text-sm mt-2">{selectedMember.experience} experience</p>
                    )}
                  </div>
                </div>

                {/* Modal Body */}
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedMember.description}</p>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
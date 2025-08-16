'use client'
import React, { useEffect, useRef, useState } from 'react';
import BarberCard from '../cards/barber-card'; // Adjust path as needed
import Image from 'next/image';

function OurBarbers() {
  const [activeTab, setActiveTab] = useState('downtown');
  const tabs = [
    { id: 'downtown', label: 'Downtown', img: '/img/shops/downtown.png' },
    { id: 'uptown', label: 'Uptown', img: '/img/shops/uptown.png' },
    { id: 'westside', label: 'Westside', img: '/img/shops/westside.png' },
    { id: 'eastside', label: 'Eastside', img: '/img/shops/eastside.png' },
  ];
  const [activeImage, setActiveImage] = useState('/img/shops/downtown.png')
  const branches = {
    downtown: {
      name: "The Haircut - Downtown",
      barbers: [
        {
          imageUrl: "/img/capster/michael-rodichev-IIpETIwh7Ig-unsplash.jpg",
          name: "Marcus Thompson",
          specialization: "Master of executive cuts and luxury grooming.",
          instagramHandle: "@marcus_executive",
        },
        {
          imageUrl: "/img/capster/gryffyn-m-U3OqRjxYiRQ-unsplash.jpg",
          name: "Alexander Stone",
          specialization: "Specialist in corporate styling and beard sculpting.",
          instagramHandle: "@alex_corporate",
        },
        {
          imageUrl: "/img/capster/zanyar-ibrahim-3bHgZ1ogvh8-unsplash.jpg",
          name: "Vincent Cruz",
          specialization: "Expert in traditional hot towel shaves and classic pompadours.",
          instagramHandle: "@vincent_classic",
        },
      ]
    },
    uptown: {
      name: "The Haircut - Uptown",
      barbers: [
        {
          imageUrl: "/img/capster/ethan-carter-barber.png",
          name: "Ethan Carter",
          specialization: "Specializes in classic cuts and beard trims.",
          instagramHandle: "@ethan_cuts",
        },
        {
          imageUrl: "/img/capster/noah-bennett-barber.png",
          name: "Sebastian King",
          specialization: "Trendsetter in creative cuts and color treatments.",
          instagramHandle: "@seb_creative",
        },
        {
          imageUrl: "/img/capster/liam-harper-barber-portrait.png",
          name: "Joshua Martinez",
          specialization: "Master of textured cuts and styling for curly hair.",
          instagramHandle: "@josh_textures",
        },
      ]
    },
    westside: {
      name: "The Haircut - Westside",
      barbers: [
        {
          imageUrl: "/img/gallery/sayan-ghosh-C99_TE-7HDI-unsplash.jpg",
          name: "Liam Harper",
          specialization: "Expert in modern fades and styling.",
          instagramHandle: "@liam_styles",
        },
        {
          imageUrl: "/img/gallery/megan-bagshaw-YmaaUNbHHtw-unsplash.jpg",
          name: "Cameron Blake",
          specialization: "Surf-inspired cuts and laid-back grooming.",
          instagramHandle: "@cam_surf",
        },
        {
          imageUrl: "/img/gallery/hannes-wolf-SL5COy-RhCQ-unsplash.jpg",
          name: "Tyler Ocean",
          specialization: "Beach waves and natural texture specialist.",
          instagramHandle: "@tyler_waves",
        },
        {
          imageUrl: "/img/capster/filip-baotic-6fQ3I_rjuVo-unsplash.jpg",
          name: "Jake Sullivan",
          specialization: "Casual cuts and maintenance trims.",
          instagramHandle: "@jake_casual",
        },
      ]
    },
    eastside: {
      name: "The Haircut - Eastside",
      barbers: [
        {
          imageUrl: "/img/meme/barber_alan-black.png",
          name: "Noah Bennett",
          specialization: "Known for precision haircuts and hot towel finishes.",
          instagramHandle: "@noah_sharp",
        },
        {
          imageUrl: "/img/meme/barber_michele-doe.png",
          name: "Diego Rodriguez",
          specialization: "Urban cuts and street-style grooming.",
          instagramHandle: "@diego_urban",
        },
        {
          imageUrl: "/img/meme/motto_img3.png",
          name: "Mason Wright",
          specialization: "Edgy cuts and experimental styling.",
          instagramHandle: "@mason_edge",
        },
        {
          imageUrl: "/img/meme/jeppe-monster-T_gTN3Po9RQ-unsplash.jpg",
          name: "Cole Anderson",
          specialization: "Barbering fundamentals and apprentice mentor.",
          instagramHandle: "@cole_fundamentals",
        },
      ]
    }
  };
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const teamCardsContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // --- PARTICLE LOGIC START ---

    // The functions can be defined inside the effect or outside.
    // Defining them inside makes them part of the component's render scope.
    const createParticle = (container: HTMLDivElement) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      // Generate a random size (e.g., between 2px and 8px)
      const randomSize = Math.floor(Math.random() * (18 - 2 + 1)) + 4;
      particle.style.width = `${randomSize}px`;
      particle.style.height = `${randomSize}px`;
      // Apply a random blur to the particle
      const randomBlur = Math.random() * 5; // Adjust the maximum blur value (e.g., 5px)
      particle.style.filter = `blur(${randomBlur}px)`;

      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';

      const duration = 3 + Math.random() * 4;
      const lifeSpan = duration + 2; // Particle's total life in seconds

      // Add the new 'fade-out' animation
      particle.style.animation = `
        float ${duration}s ease-in-out infinite,
        fade-out 2s ease-in-out ${lifeSpan - 2}s forwards
      `;
      particle.style.animationDelay = Math.random() * 2 + 's';

      container.appendChild(particle);

      // The particle is removed after its full lifespan + a small buffer
      const timeoutId = setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
          createParticle(container);
        }
      }, lifeSpan * 1000);

      return timeoutId;
    };

    const createParticles = () => {
      const container = particlesContainerRef.current;
      if (!container) return; // Exit if the ref isn't attached yet

      const particleCount = 20;
      const timeouts = []; // Store timeout IDs for cleanup

      for (let i = 0; i < particleCount; i++) {
        timeouts.push(createParticle(container));
      }
      return timeouts;
    };

    const particleTimeouts = createParticles();
    // Animation on scroll (using a selector still works fine here)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Get all team cards within the container
    const teamCards = teamCardsContainerRef.current ? teamCardsContainerRef.current.querySelectorAll('.team-card') : [];
    teamCards.forEach((card: Element) => {
      observer.observe(card);
    });

    // Animate subtitle using the ref
    if (subtitleRef.current) {
      const subtitle = subtitleRef.current;
      setTimeout(() => {
        subtitle.style.opacity = '1';
        subtitle.style.transition = 'all 0.8s ease 0.5s';
        subtitle.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          subtitle.style.transform = 'translateY(0)';
        }, 100);
      }, 800);
    }
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      const cards: NodeListOf<HTMLDivElement> | never[] = teamCardsContainerRef.current
        ? teamCardsContainerRef.current.querySelectorAll('.team-card')
        : [];
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const strength = 1 - distance / maxDistance;
          const moveX = (x / distance) * strength * 5;
          const moveY = (y / distance) * strength * 5;
          card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          card.style.transform = '';
        }
      });
    };

    // 5. Reset card positions when mouse leaves
    const handleMouseLeave = () => {
      const cards: NodeListOf<HTMLDivElement> | never[] = teamCardsContainerRef.current
        ? teamCardsContainerRef.current.querySelectorAll('.team-card')
        : [];
      cards.forEach((card) => {
        card.style.transform = '';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 6. Cleanup function
    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      particleTimeouts!.forEach((id) => clearTimeout(id));
    };

  }, []);
  useEffect(()=>{
    function getTabById(tabId: string) {
      return tabs.find(tab => tab.id === tabId);
    }
    const selectedTab = getTabById(activeTab)
    if(selectedTab) setActiveImage(selectedTab.img)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeTab])
  return (
    <>
      <h2 ref={subtitleRef} className="text-white text-4xl font-playfair font-bold leading-tight tracking-[-0.015em] px-4 pt-5">Our Barbers</h2>
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto px-4 mb-4">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Branch Title with Background */}
      <div className="mx-4 mb-6 group relative overflow-hidden rounded-xl">
          
        {/* Background Image with Tint */}
        <div className="absolute inset-0 bg-cover bg-center h-full w-full">
          <Image
            src={activeImage}
            alt={activeTab}
            fill
            sizes="60vw"
            loading="lazy"
            objectFit="cover"
            quality={85}
          />
          <div
            className="absolute inset-0 z-10 duration-500 ease-in-out transform group-hover:-translate-y-full"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))'
            }}
          ></div>
        </div>
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <div ref={particlesContainerRef} id="particles" className="h-full float mix-blend-multiply w-full"></div>
        </div>
      
        {/* Branch Name */}
        <div className="relative z-10 px-8 py-12 text-center">
          <h3 className="text-white text-[42px] md:text-[52px] font-black leading-[0.9] tracking-[-0.02em] drop-shadow-2xl">
            <span className="block text-[24px] md:text-[28px] font-medium opacity-80 mb-1">THE HAIRCUT</span>
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-black">
              {branches[activeTab as keyof typeof branches].name.split(' - ')[1]?.toUpperCase()}
            </span>
          </h3>
          
          {/* Decorative Line */}
          <div className="mx-auto mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30"></div>
        
      </div>

      {/* Barbers Grid */}
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={teamCardsContainerRef} className="flex flex-wrap items-stretch place-items-center gap-3 p-4">
          {branches[activeTab as keyof typeof branches].barbers.map((barber, index) => (
            <BarberCard
              key={`${activeTab}-${index}`}
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
"use client"
import { useState, useMemo } from "react";
import { HairstyleCard } from "@/components/cards/HairstyleCard";
import { FilterTabs } from "@/components/FilterTabs";
import { SearchBar } from "@/components/SearchBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { hairstyles, categories } from "@/data/hairstyles";
import { Scissors } from "lucide-react";

const FeaturedHaircuts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState('carousel');
  const filteredHairstyles = useMemo(() => {
    return hairstyles.filter((hairstyle) => {
      const matchesCategory = activeCategory === "All" || hairstyle.category === activeCategory;
      const matchesSearch = hairstyle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hairstyle.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <section className="overflow-x-visible mt-5 mb-14 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="container mx-auto text-center">
        <div className="inline-flex justify-center px-4 pt-5">
          <h2 className="text-white text-2xl font-bold md:text-6xl leading-tight tracking-[-0.015em]">Featured Haircuts</h2>
          <Scissors className="w-16 h-16 pt-5 text-amber-50" />
        </div>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-primary-foreground/90">
          Discover the perfect cut for your style.
        </p>
      </div>
      {/* Gallery Section */}
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-between mb-11 space-y-2 md:flex-row">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <div className="flex items-center space-x-4">
            <FilterTabs 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <div className="flex items-center overflow-hidden border border-gray-300 rounded-md">
              <button 
                onClick={() => setViewMode('carousel')}
                className={`px-2 py-1 text-sm ${viewMode === 'carousel' ? 'bg-card text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-2 py-1 text-sm ${viewMode === 'grid' ? 'bg-card text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <div className="relative px-2 sm:px-0">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full mx-auto overflow-x-visible"
            >
              <CarouselContent className="gap-6 -ml-2">
                {filteredHairstyles.map((hairstyle, index) => (
                  <CarouselItem key={index} className="pl-2 basis-3/4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                    <HairstyleCard
                      key={hairstyle.id}
                      id={hairstyle.id}
                      name={hairstyle.name}
                      category={hairstyle.category}
                      difficulty={hairstyle.difficulty}
                      image={hairstyle.image}
                      description={hairstyle.description}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Positioned navigation buttons */}
              <CarouselPrevious className="absolute -translate-y-1/2 -left-4 top-1/2" />
              <CarouselNext className="absolute -translate-y-1/2 -right-4 top-1/2" />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHairstyles.map((hairstyle) => (
              <HairstyleCard
                key={hairstyle.id}
                id={hairstyle.id}
                name={hairstyle.name}
                category={hairstyle.category}
                difficulty={hairstyle.difficulty}
                image={hairstyle.image}
                description={hairstyle.description}
              />
            ))}
          </div>
        )}

        {filteredHairstyles.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No hairstyles found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedHaircuts;

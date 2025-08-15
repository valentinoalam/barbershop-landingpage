/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Clock, Star, Scissors } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HairstyleCardProps {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  image: string;
  description: string;
  timeRequired?: string;
  toolsNeeded?: string[];
  tips?: string[];
}

export const HairstyleCard = ({ 
  name, 
  category, 
  difficulty, 
  image, 
  description,
  timeRequired = "30-45 min",
  toolsNeeded = ["Hair brush", "Hair ties", "Bobby pins"],
  tips = ["Work with slightly damp hair for better hold", "Practice makes perfect!"]
}: HairstyleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    const level = difficulty.toLowerCase() === 'easy' ? 1 : 
                 difficulty.toLowerCase() === 'medium' ? 2 : 3;
    return Array.from({ length: 3 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Card 
        className="group relative gap-0 py-0 overflow-hidden border-0 shadow-md hover:shadow-[var(--card-hover)] transition-[var(--transition-smooth)] bg-card cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="flex items-baseline justify-between w-full ps-1 pe-0.5 pt-1 mb-0.5">
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
          <Badge variant={"secondary"} className="text-xs pb-0.5 self-center">
            {category}
          </Badge>
        </CardHeader>
        
        <div className="relative overflow-hidden bg-center bg-no-repeat bg-cover aspect-square">
          <Image 
            width={300} 
            height={300} 
            src={image} 
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Hover Overlay */}
          <div 
            className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <h3 className="text-xl font-bold mb-2 text-center">{name}</h3>
            <p className="text-sm text-center mb-4 line-clamp-4">{description}</p>
            <Badge variant="secondary" className="text-sm">
              Difficulty: {difficulty}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Modal Content */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-left space-x-5 text-xl">
            <span>{name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3 px-3">
              <Scissors className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Difficulty</p>
                <div className="flex items-center gap-1">
                  {getDifficultyStars(difficulty)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 py-1">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Time Required</p>
                <p className="text-sm text-muted-foreground">{timeRequired}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-3">
              <Star className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{category}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>

          {/* Tools Needed */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tools Needed</h3>
            <div className="flex flex-wrap gap-2">
              {toolsNeeded.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Pro Tips</h3>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
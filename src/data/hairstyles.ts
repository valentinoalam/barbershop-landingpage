export interface Hairstyle {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  image: string;
  description: string;
}

export const hairstyles: Hairstyle[] = [
  {
    id: "1",
    name: "Modern Textured Quiff",
    category: "Short",
    difficulty: "Medium",
    image: "/img/hairstyles/quiff-style.jpg",
    description: "A contemporary take on the classic quiff with textured layers and modern styling techniques."
  },
  {
    id: "2",
    name: "Classic Pompadour",
    category: "Medium",
    difficulty: "Hard",
    image: "/img/hairstyles/pompadour-style.jpg",
    description: "Timeless vintage style with volume and height, perfect for formal occasions and retro looks."
  },
  {
    id: "3",
    name: "Skin Fade",
    category: "Short",
    difficulty: "Easy",
    image: "/img/hairstyles/fade-style.jpg",
    description: "Clean, professional cut with gradual fading from skin to longer hair on top."
  },
  {
    id: "4",
    name: "Military Buzz Cut",
    category: "Short",
    difficulty: "Easy",
    image: "/img/hairstyles/buzz-cut-style.jpg",
    description: "Ultra-short, low-maintenance style perfect for active lifestyles and hot weather."
  },
  {
    id: "5",
    name: "Slicked Back",
    category: "Medium",
    difficulty: "Medium",
    image: "/img/hairstyles/slicked-back-style.jpg",
    description: "Sophisticated business style with hair combed straight back using styling products."
  },
  {
    id: "6",
    name: "Disconnected Undercut",
    category: "Long",
    difficulty: "Hard",
    image: "/img/hairstyles/undercut-style.jpg",
    description: "Edgy style with shaved sides and long top section, creating a bold contrast."
  }
];

export const categories = ["All", "Short", "Medium", "Long"];
export const difficulties = ["Easy", "Medium", "Hard"];
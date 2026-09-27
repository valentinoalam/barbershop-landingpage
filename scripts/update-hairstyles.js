import fs from 'fs';
import path from 'path';
const categories = ["All", "Short", "Medium", "Long"];
const difficulties = ["Easy", "Medium", "Hard"];

const rawHairstyles = [
  {
    id: "1",
    name: "Modern Textured Quiff",
    category: "Short",
    difficulty: "Medium",
    image: "/img/hairstyles/quiff-style.jpg",
    folder: "quiff",
    description: "A contemporary take on the classic quiff with textured layers and modern styling techniques."
  },
  {
    id: "2",
    name: "Classic Pompadour",
    category: "Medium",
    difficulty: "Hard",
    image: "/img/hairstyles/pompadour-style.jpg",
    folder: "pompad",
    description: "Timeless vintage style with volume and height, perfect for formal occasions and retro looks."
  },
  {
    id: "3",
    name: "Skin Fade",
    category: "Short",
    difficulty: "Easy",
    image: "/img/hairstyles/fade-style.jpg",
    folder: "fade",
    description: "Clean, professional cut with gradual fading from skin to longer hair on top."
  },
  {
    id: "4",
    name: "Military Buzz Cut",
    category: "Short",
    difficulty: "Easy",
    image: "/img/hairstyles/buzz-cut-style.jpg",
    folder: "buzz",
    description: "Ultra-short, low-maintenance style perfect for active lifestyles and hot weather."
  },
  {
    id: "5",
    name: "Slicked Back",
    category: "Medium",
    difficulty: "Medium",
    image: "/img/hairstyles/slicked-back-style.jpg",
    folder: "slicked",
    description: "Sophisticated business style with hair combed straight back using styling products."
  },
  {
    id: "6",
    name: "Disconnected Undercut",
    category: "Long",
    difficulty: "Hard",
    image: "/img/hairstyles/undercut-style.jpg",
    folder: "undercut",
    description: "Edgy style with shaved sides and long top section, creating a bold contrast."
  },
  {
    id: "7",
    name: "Caesar Cut",
    category: "Short",
    difficulty: "Medium",
    image: "/img/hairstyles/caesar/Caesar-with-Tapered-Sideburns-500x615_ztxsxy.jpg",
    folder: "caesar",
    description: "Edgy style with shaved sides and long top section, creating a caesar look."
  },
  {
    id: "8",
    name: "French Crop",
    category: "Medium",
    difficulty: "Medium",
    image: "/img/hairstyles/french-crop/French-Crop-Haircut-480x600_jjctfh_amlcnd.jpg",
    folder: "french-crop",
    description: "Edgy style with shaved sides and medium top section, creating a bold contrast."
  }
];

const updatedHairstyles = rawHairstyles.map((style) => {
  // Format nama folder (misal: "Modern Textured Quiff" -> "modern-textured-quiff")
  const folderName = style.folder;
  const dirPath = path.join(process.cwd(), 'public', 'img', 'hairstyles', folderName);

  let galleryFiles = [];

  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    galleryFiles = files
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((file) => `/img/hairstyles/${folderName}/${file}`);
  }

  return {
    ...style,
    gallery: galleryFiles
  };
});

const tsContent = `export interface Hairstyle {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  image: string;
  description: string;
  gallery: string[];
}

export const hairstyles: Hairstyle[] = ${JSON.stringify(updatedHairstyles, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};
export const difficulties = ${JSON.stringify(difficulties, null, 2)};
`;

// Tulis kembali ke src/data/hairstyles.ts (sesuaikan path target jika berbeda)
const targetPath = path.join(process.cwd(), 'src', 'data', 'hairstyles.ts');
fs.writeFileSync(targetPath, tsContent, 'utf-8');
console.log('✅ File hairstyles.ts berhasil di-update dengan data gallery gambar!');
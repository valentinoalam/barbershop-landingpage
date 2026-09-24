import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sizeOf from 'image-size';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '0');
    const limit = parseInt(searchParams.get('limit') || '50');

    const imagesDirectory1 = path.join(process.cwd(), 'public', 'img', 'gallery');
    const imagesDirectory2 = path.join(process.cwd(), 'public', 'img', 'meme');
    
    // Read filenames from both directories
    const filenames1 = await fs.readdir(imagesDirectory1);
    const filenames2 = await fs.readdir(imagesDirectory2);

    // Combine and label filenames with their folder source
    const filenames = [
      ...filenames1.map(filename => ({ filename, folder: 'gallery' })),
      ...filenames2.map(filename => ({ filename, folder: 'meme' }))
    ];
    
    // Paginate results
    const start = page * limit;
    const end = start + limit;
    const paginatedFilenames = filenames.slice(start, end);
    
    const images = await Promise.all(paginatedFilenames.map(async (file, index) => {
      const filePath = path.join(process.cwd(), 'public', 'img', file.folder, file.filename);
      const buffer = await fs.readFile(filePath);
      const dimensions = sizeOf(buffer);
      
      return {
        id: start + index + 1,
        src: `/img/${file.folder}/${file.filename}`,
        alt: file.filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
        width: dimensions?.width || 400,
        height: dimensions?.height || 300,
        aspectRatio: dimensions?.width && dimensions?.height 
          ? dimensions.width / dimensions.height 
          : 1
      };
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Failed to read images:', error);
    return NextResponse.json([], { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'img', 'hero');
    const filenames = fs.readdirSync(imagesDirectory);
    
    const images = filenames.map(filename => ({
      src: `/img/hero/${filename}`,
      alt: filename.split('.')[0]
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Failed to read hero images:', error);
    return NextResponse.json([], { status: 500 });
  }
}
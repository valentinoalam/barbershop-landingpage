'use client'
import Image from 'next/image'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

const ImagePreview = ({image}: {image: {mediaUrl: string, name: string, width: number, height: number}}) => {
  return (
    <div className="w-full">
			<Dialog>
				<DialogTrigger>
					<div className="cursor-pointer group">
						<Image 
							src={image.mediaUrl} 
							alt={image.name}
							width={image.width}
							height={image.height}
							className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
						/>
					</div>
				</DialogTrigger>
				<DialogContent className="max-w-4xl p-0 bg-transparent border-none" showCloseButton={false}>
					<button 
							className="absolute -top-4 -right-4 z-50 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors"
							onClick={() => document.body.click()}
						>
							<X className="h-6 w-6 text-gray-700" />
						</button>
					<div className="relative w-full aspect-auto min-h-75">
						<Image 
							src={image.mediaUrl} 
							alt={image.name}
							fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
						/>
						
					</div>
				</DialogContent>
			</Dialog>
		</div>
  )
}

export default ImagePreview
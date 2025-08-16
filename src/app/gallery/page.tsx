"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface GridItem {
  id: number
  width: number
  height: number
  aspectRatio: number
  src: string
  alt: string
}

export default function InfiniteMasonry() {
  const [items, setItems] = useState<GridItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const pageRef = useRef(0)
  const scrollCheckRef = useRef<NodeJS.Timeout | null>(null)

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const res = await fetch(`/api/gallery/full?page=${pageRef.current}&limit=50`)
      const newItems: GridItem[] = await res.json()
      
      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setItems((prev) => [...prev, ...newItems])
        pageRef.current += 1
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore])

  useEffect(() => {
    loadMoreItems()
  }, [loadMoreItems])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollCheckRef.current) return
      
      scrollCheckRef.current = setTimeout(() => {
        const scrollPosition = window.innerHeight + window.scrollY
        const documentHeight = document.documentElement.offsetHeight
        
        if (scrollPosition >= documentHeight - 500 && !loading && hasMore) {
          loadMoreItems()
        }
        scrollCheckRef.current = null
      }, 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollCheckRef.current) clearTimeout(scrollCheckRef.current)
    }
  }, [loadMoreItems, loading, hasMore])

  const openImageModal = (src: string) => {
    setSelectedImage(src)
    document.body.style.overflow = 'hidden'
  }

  const closeImageModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="container mx-auto min-h-screen mt-30">
      <div className="p-4 mx-auto mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 break-inside-avoid cursor-pointer hover:opacity-90 transition-opacity relative group"
            onClick={() => openImageModal(item.src)}
          >
            <div className="relative" style={{ paddingBottom: `${(1 / item.aspectRatio) * 100}%` }}>
              <Image 
                src={item.src}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
                loading="lazy"
                alt={item.alt || `Gallery item ${item.id}`}
                className="object-cover"
              />
            </div>
            {/* <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-semibold text-lg text-white">{item.alt}</span>
            </div> */}
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && !hasMore && items.length > 0 && (
        <div className="flex justify-center mt-90 py-8 text-gray-500">
          You&apos;ve reached the end of the gallery
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative w-full max-w-6xl h-[90vh] flex items-center justify-center">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 rounded-full p-2 text-white transition-colors z-10"
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                fill
                quality={90}
                alt="Full size view"
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
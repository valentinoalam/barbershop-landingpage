/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, ShoppingBag, Search } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  rating: number
  reviews: number
  stock: number
  available: boolean
  favorite: boolean
}

const categories = ["All", "Shampoo", "Conditioner", "Styling", "Accessories", "Beard Care"]

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Revitalizing Shampoo",
    price: 15,
    description: "Gentle cleansing for healthy hair",
    image: "shampoo.png",
    category: "Shampoo",
    rating: 4.8,
    reviews: 125,
    stock: 50,
    available: true,
    favorite: false,
  },
  {
    id: "2",
    name: "Nourishing Conditioner",
    price: 18,
    description: "Deep conditioning for smooth hair",
    image: "conditioner.png",
    category: "Conditioner",
    rating: 4.7,
    reviews: 98,
    stock: 35,
    available: true,
    favorite: true,
  },
  {
    id: "3",
    name: "Sculpting Clay",
    price: 20,
    description: "Flexible hold with matte finish",
    image: "sculpting_clay.png",
    category: "Styling",
    rating: 4.9,
    reviews: 156,
    stock: 25,
    available: true,
    favorite: false,
  },
  {
    id: "4",
    name: "Finishing Spray",
    price: 12,
    description: "Long-lasting hold for any style",
    image: "finishing_spray.png",
    category: "Styling",
    rating: 4.6,
    reviews: 89,
    stock: 40,
    available: true,
    favorite: false,
  },
  {
    id: "5",
    name: "Beard Oil",
    price: 25,
    description: "Nourishing oil for healthy beards",
    image: "beard-oil.png",
    category: "Beard Care",
    rating: 4.8,
    reviews: 134,
    stock: 30,
    available: true,
    favorite: true,
  },
  {
    id: "6",
    name: "Hair Comb",
    price: 8,
    description: "Professional grade styling comb",
    image: "the-skin-and-the-beard-story-T1IQEZET7u0-unsplash.jpg",
    category: "Accessories",
    rating: 4.5,
    reviews: 67,
    stock: 100,
    available: true,
    favorite: false,
  },
  {
    id: "7",
    name: "Travel Kit",
    price: 40,
    description: "Complete grooming kit for travel",
    image: "travel-kit.png",
    category: "Accessories",
    rating: 4.7,
    reviews: 78,
    stock: 15,
    available: true,
    favorite: false,
  },
  {
    id: "8",
    name: "Gift Card",
    price: 50,
    description: "Perfect gift for any gentleman",
    image: "gift-card.png",
    category: "Accessories",
    rating: 5.0,
    reviews: 45,
    stock: 999,
    available: true,
    favorite: false,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by rating
    filtered = filtered.filter((product) => product.rating >= minRating)

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, priceRange, minRating, searchQuery])

  return (
      <div className="px-40 mt-16 flex flex-1 justify-center py-5">
        <div className="flex text-white flex-col max-w-6xl flex-1">
          {/* Page Title */}
          <div className="flex justify-between items-center p-4">
            <h1 className="text-4xl font-bold tracking-tight min-w-72">Products</h1>
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 p-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex h-8 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                  selectedCategory === category
                    ? "bg-amber-600 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                <span className="text-sm font-medium">{category}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <h3 className="text-lg font-bold px-4 pb-2 pt-4">Filters</h3>

          {/* Price Range Filter */}
          <div className="relative flex w-full flex-col items-start justify-between gap-3 p-4">
            <p className="text-base font-medium w-full">Price Range</p>
            <div className="flex h-10 w-full items-center gap-4">
              <div className="flex h-1 flex-1 rounded-sm bg-slate-600 relative">
                <div
                  className="h-1 bg-amber-600 rounded-sm"
                  style={{ width: `${(priceRange[1] / 100) * 100}%`, marginLeft: `${(priceRange[0] / 100) * 100}%` }}
                />
                <div className="absolute -left-2 -top-1.5 w-4 h-4 rounded-full bg-white cursor-pointer" />
                <div className="absolute -right-2 -top-1.5 w-4 h-4 rounded-full bg-white cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-between w-full text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="relative flex w-full flex-col items-start justify-between gap-3 p-4">
            <div className="flex w-full items-center justify-between">
              <p className="text-base font-medium">Customer Ratings</p>
              <p className="text-sm">{minRating}</p>
            </div>
            <div className="flex h-4 w-full items-center gap-4">
              <div className="flex h-1 flex-1 rounded-sm bg-slate-600">
                <div className="h-full bg-amber-600 rounded-sm" style={{ width: `${(minRating / 5) * 100}%` }} />
                <div className="relative">
                  <div className="absolute -left-2 -top-1.5 w-4 h-4 rounded-full bg-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 p-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="flex flex-col gap-3 pb-3">
                  <div className="relative">
                    <div className="w-full relative aspect-square rounded-xl group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={`/img/products/${product.image}`}
                        alt={product.name} // Always add a descriptive alt tag for accessibility
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    {product.favorite && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                    {!product.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                        <span className="text-white font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-medium group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <span className="text-slate-500 text-sm">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-amber-400 text-lg font-bold">${product.price}</p>
                      <span className="text-slate-500 text-sm">{product.stock} in stock</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

  )
}

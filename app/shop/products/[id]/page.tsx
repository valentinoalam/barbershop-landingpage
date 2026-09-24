/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, ShoppingBag, ArrowLeft, ThumbsUp, ThumbsDown, Plus, Minus } from "lucide-react"
import { useParams } from 'next/navigation';
import Image from "next/image";

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
  ingredients?: string
  detailedDescription?: string
}

interface Review {
  id: string
  customerName: string
  rating: number
  date: string
  comment: string
  likes: number
  dislikes: number
  avatar: string
}

const mockProducts = [
  {
    id: "1",
    name: "Revitalizing Shampoo",
    price: 15,
    description: "Gentle cleansing for healthy hair",
    detailedDescription: "Our Revitalizing Shampoo is designed to gently cleanse your hair and scalp, removing impurities without stripping natural oils. Infused with a blend of nourishing ingredients, it leaves your hair feeling clean, soft, and refreshed. Perfect for daily use, this shampoo helps maintain a healthy balance and adds a natural shine to your hair.",
    image: "shampoo.png",
    category: "Shampoo",
    rating: 4.8,
    reviews: 125,
    stock: 50,
    available: true,
    favorite: false,
    ingredients: "Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Sodium Chloride, Fragrance, Citric Acid, Panthenol (Pro-Vitamin B5), Phenoxyethanol, Ethylhexylglycerin.",
  },
  {
    id: "2",
    name: "Nourishing Conditioner",
    price: 18,
    description: "Deep conditioning for smooth hair",
    detailedDescription: "Transform your hair with our premium Nourishing Conditioner, specially formulated to restore moisture and vitality to all hair types. This rich, creamy formula penetrates deep into the hair shaft to repair damage, reduce frizz, and enhance natural shine. Enriched with natural oils and proteins, it strengthens hair from root to tip while providing long-lasting hydration.",
    image: "conditioner.png",
    category: "Conditioner",
    rating: 4.7,
    reviews: 98,
    stock: 35,
    available: true,
    favorite: true,
    ingredients: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Dimethicone, Amodimethicone, Parfum, Phenoxyethanol, Ethylhexylglycerin, Argania Spinosa Kernel Oil, Hydrolyzed Keratin, Panthenol.",
  },
  {
    id: "3",
    name: "Sculpting Clay",
    price: 20,
    description: "Flexible hold with matte finish",
    detailedDescription: "Achieve effortless style with our premium Sculpting Clay. This versatile styling product offers medium to strong hold with a natural matte finish, perfect for creating textured, lived-in looks. The clay formula adds volume and definition while maintaining flexibility throughout the day.",
    image: "sculpting_clay.png",
    category: "Styling",
    rating: 4.9,
    reviews: 156,
    stock: 25,
    available: true,
    favorite: false,
    ingredients: "Kaolin Clay, Beeswax, Coconut Oil, Shea Butter, Bentonite Clay, Essential Oils, Vitamin E, Natural Fragrance.",
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
];

const mockReviews: { [key: string]: Review[] } = {
  "1": [
    {
      id: "1",
      customerName: "Ethan Carter",
      rating: 5,
      date: "May 15, 2024",
      comment:
        "This styling gel is a game-changer! It holds my hair perfectly all day without making it feel stiff or sticky. The scent is subtle and masculine, and it washes out easily. Highly recommend!",
      likes: 25,
      dislikes: 2,
      avatar: "/ethan-carter-barber.png",
    },
    {
      id: "2",
      customerName: "Liam Harper",
      rating: 4,
      date: "April 22, 2024",
      comment:
        "Great product for everyday use. It provides a good hold and keeps my hair looking neat. I wish it had a bit more shine, but overall, I'm very satisfied.",
      likes: 18,
      dislikes: 1,
      avatar: "/liam-harper-barber-portrait.png",
    },
  ],
  "2": [
    {
      id: "3",
      customerName: "Michael Johnson",
      rating: 5,
      date: "June 10, 2024",
      comment:
        "Best conditioner I've ever used! My hair feels incredibly soft and manageable after each use. The scent is amazing too.",
      likes: 32,
      dislikes: 0,
      avatar: "/noah-bennett-barber.png",
    },
  ],
  "3": [
    {
      id: "4",
      customerName: "David Wilson",
      rating: 5,
      date: "May 28, 2024",
      comment:
        "Perfect for my thick hair. Gives great texture and hold without being too heavy. Love the matte finish!",
      likes: 28,
      dislikes: 1,
      avatar: "/ethan-carter-barber.png",
    },
  ],
}

const relatedProducts = [
  {
    id: "4",
    name: "Finishing Spray",
    description: "Long-lasting hold for any style",
    image: "finishing_spray.png",
  },
  {
    id: "5",
    name: "Beard Oil",
    description: "Nourishing oil for healthy beards",
    image: "beard-oil.png",
  },
  {
    id: "6",
    name: "Hair Comb",
    description: "Professional grade styling comb",
    image: "the-skin-and-the-beard-story-T1IQEZET7u0-unsplash.jpg",
  },
];

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if(!id) return
    const productData = mockProducts[parseInt(id as string)]
    const reviewData = mockReviews[parseInt(id as string)] || []

    if (productData) {
      setProduct(productData)
      setReviews(reviewData)
    }
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-amber-400 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++
    })

    const total = reviews.length
    return Object.entries(distribution)
      .reverse()
      .map(([rating, count]) => ({
        rating: Number.parseInt(rating),
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
  }

  return (
      <div className="px-10 lg:px-40 mt-16 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-6xl flex-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 p-4 text-sm">
            <Link href="/products" className="text-amber-400 hover:underline flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>

          {/* Product Title */}
          <div className="flex justify-between items-center p-4">
            <h1 className="text-4xl text-white font-bold tracking-tight">{product.name}</h1>
          </div>

          {/* Product Image */}
          <div className="w-full p-4">
            <div className="w-full max-w-md mx-auto">
              <div className="w-full relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src={`/img/products/${ product.image }`}
                  alt={product.name || "Product Image"}
                  fill
                  className="object-cover bg-center bg-no-repeat"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 p-4">
            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between bg-card rounded-lg p-6">
              <div className="flex items-center gap-6">
                <div className="text-3xl font-bold text-amber-400">${product.price}</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-slate-300 leading-relaxed">{product.detailedDescription || product.description}</p>
            </div>

            {/* Ingredients */}
            {product.ingredients && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                <p className="text-slate-300 leading-relaxed">{product.ingredients}</p>
              </div>
            )}

            {/* Customer Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

              {/* Rating Summary */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex flex-col gap-2">
                  <div className="text-4xl font-black">{product.rating}</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-400">{product.reviews} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3 min-w-[300px]">
                  {getRatingDistribution().map(({ rating, percentage }) => (
                    <div key={rating} className="contents">
                      <span className="text-sm">{rating}</span>
                      <div className="flex h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="bg-amber-400 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-sm text-right">{Math.round(percentage)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 bg-slate-600 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${review.avatar}")` }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{review.customerName}</h4>
                        <p className="text-slate-400 text-sm">{review.date}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating ? "text-amber-400 fill-current" : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-slate-300 mb-4 leading-relaxed">{review.comment}</p>

                    <div className="flex gap-6 text-slate-400">
                      <button className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                        <ThumbsUp className="w-5 h-5" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                        <ThumbsDown className="w-5 h-5" />
                        <span>{review.dislikes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Products */}
            <div>
              <h2 className="text-2xl text-white font-bold mb-6">Related Products</h2>
              <div className="flex overflow-x-auto gap-4 pb-4">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="flex-shrink-0 w-40 group"
                  >
                    <div className="w-full relative aspect-[3/4] rounded-xl mb-3 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={`/img/products/${ relatedProduct.image }`}
                        alt={relatedProduct.name || 'Product Image'}
                        fill
                        className="object-cover bg-center bg-no-repeat"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-amber-400 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-slate-400 text-sm">{relatedProduct.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="flex justify-start">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

  )
}

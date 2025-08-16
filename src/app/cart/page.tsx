"use client"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "../../contexts/CartContext"
import FloatingChatButton from "../../components/FloatingChatButton"

export default function CartPage() {
  const { state: cartState, dispatch: cartDispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    cartDispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    cartDispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    cartDispatch({ type: "CLEAR_CART" })
  }

  return (
    <div
      className="min-h-screen bg-slate-900 text-white"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-700 px-10 py-3">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_543)">
                <path
                  d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
          <Link href="/" className="text-lg font-bold tracking-tight">
            The Sharp Edge
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link href="/" className="text-sm font-medium hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link href="/booking" className="text-sm font-medium hover:text-amber-400 transition-colors">
              Services
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-amber-400 transition-colors">
              Products
            </Link>
            <Link href="/locations" className="text-sm font-medium hover:text-amber-400 transition-colors">
              Locations
            </Link>
            <Link href="/appointments" className="text-sm font-medium hover:text-amber-400 transition-colors">
              Appointments
            </Link>
          </div>
          <div className="flex gap-2">
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 bg-amber-600 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Link>
          </div>
          <Link
            href="/booking"
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full font-medium transition-colors"
          >
            Book Now
          </Link>
        </div>
      </header>

      <div className="px-10 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to Products */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Shopping Cart</h1>
            {cartState.items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            )}
          </div>

          {cartState.items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-400 mb-2">Your cart is empty</h2>
              <p className="text-slate-500 mb-6">Add some products to get started</p>
              <Link
                href="/products"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Shop Products
              </Link>
            </div>
          ) : (
            /* Cart Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartState.items.map((item) => (
                  <div key={item.id} className="bg-slate-800 rounded-lg p-6 flex gap-4">
                    <div
                      className="w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                      <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                      <p className="text-amber-400 font-bold">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-slate-800 rounded-lg p-6 h-fit">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartState.itemCount} items)</span>
                    <span>${cartState.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(cartState.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-amber-400">${(cartState.total * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center block mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <FloatingChatButton />
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, MapPin, User, Phone, Mail, ShoppingBag } from "lucide-react"
import { useCart } from "../../contexts/cart-context"
import FloatingChatButton from "../../components/FloatingChatButton"

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  notes: string
}

export default function CheckoutPage() {
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const generateWhatsAppMessage = () => {
    const orderDetails = cartState.items
      .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const customerDetails = `
Customer Information:
Name: ${customerInfo.firstName} ${customerInfo.lastName}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}, ${customerInfo.city} ${customerInfo.zipCode}
${customerInfo.notes ? `Notes: ${customerInfo.notes}` : ""}

Order Details:
${orderDetails}

Subtotal: $${cartState.total.toFixed(2)}
Tax: $${(cartState.total * 0.1).toFixed(2)}
Total: $${(cartState.total * 1.1).toFixed(2)}
    `.trim()

    return encodeURIComponent(`New Order from The Sharp Edge Website:\n\n${customerDetails}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate WhatsApp message
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Clear cart and show success
    cartDispatch({ type: "CLEAR_CART" })
    setOrderComplete(true)
    setIsProcessing(false)
  }

  const isFormValid = () => {
    return (
      customerInfo.firstName &&
      customerInfo.lastName &&
      customerInfo.email &&
      customerInfo.phone &&
      customerInfo.address &&
      customerInfo.city &&
      customerInfo.zipCode
    )
  }

  if (orderComplete) {
    return (
      <div
        className="min-h-screen bg-slate-900 text-white flex items-center justify-center"
        style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Sent Successfully!</h1>
          <p className="text-slate-400 mb-6">
            Your order has been sent via WhatsApp. We&apos;ll contact you shortly to confirm your order and arrange delivery.
          </p>
          <div className="space-y-3">
            <Link
              href="/products"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors block"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-colors block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartState.items.length === 0) {
    return (
      <div
        className="min-h-screen bg-slate-900 text-white flex items-center justify-center"
        style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
      >
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-slate-400 mb-6">Add some products before checking out</p>
          <Link
            href="/products"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Shop Products
          </Link>
        </div>
      </div>
    )
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
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartState.itemCount}
            </span>
          </Link>
        </div>
      </header>

      <div className="px-10 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back to Cart */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          {/* Page Title */}
          <h1 className="text-4xl font-bold tracking-tight mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-bold">Customer Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-bold">Delivery Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={customerInfo.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-2">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                      placeholder="Special delivery instructions..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  {cartState.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 bg-center bg-no-repeat bg-cover rounded"
                          style={{ backgroundImage: `url("${item.image}")` }}
                        />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t border-slate-600 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
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
                  <div className="flex justify-between text-lg font-bold border-t border-slate-600 pt-2">
                    <span>Total</span>
                    <span className="text-amber-400">${(cartState.total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-amber-800 text-sm">
                    <strong>WhatsApp Order:</strong> Your order will be sent via WhatsApp for confirmation. Payment will
                    be collected upon delivery.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!isFormValid() || isProcessing}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      Send Order via WhatsApp
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <FloatingChatButton />
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import { MapPin, Phone, Clock, Mail, ArrowLeft } from "lucide-react"
import { useState } from "react"
import LocationMap from "../../components/LocationMap"
import Image from "next/image"

export default function LocationsPage() {
  const [activeTab, setActiveTab] = useState(1)

  const locations = [
    {
      id: 1,
      name: "The Haircut - Downtown",
      address: "123 Main Street, Downtown District, NY 10001",
      phone: "(555) 123-4567",
      email: "downtown@thehaircut.com",
      lat: 40.7505,
      lng: -73.9934,
      hours: {
        "Monday - Friday": "9:00 AM - 8:00 PM",
        Saturday: "8:00 AM - 6:00 PM",
        Sunday: "10:00 AM - 5:00 PM",
      },
      image: "/downtown-barbershop.png",
      features: ["Premium Cuts", "Hot Towel Shaves", "Beard Styling", "Hair Washing"],
      manager: "Ethan Carter",
    },
    {
      id: 2,
      name: "The Haircut - Uptown",
      address: "456 Oak Avenue, Uptown Plaza, NY 10002",
      phone: "(555) 234-5678",
      email: "uptown@thehaircut.com",
      lat: 40.7831,
      lng: -73.9712,
      hours: {
        "Monday - Friday": "8:00 AM - 7:00 PM",
        Saturday: "8:00 AM - 6:00 PM",
        Sunday: "Closed",
      },
      image: "/uptown-barbershop.png",
      features: ["Classic Cuts", "Beard Trimming", "Mustache Styling", "Scalp Treatment"],
      manager: "Liam Harper",
    },
    {
      id: 3,
      name: "The Haircut - Westside",
      address: "789 Pine Road, Westside Mall, NY 10003",
      phone: "(555) 345-6789",
      email: "westside@thehaircut.com",
      lat: 40.7614,
      lng: -74.0055,
      hours: {
        "Monday - Friday": "10:00 AM - 9:00 PM",
        Saturday: "9:00 AM - 8:00 PM",
        Sunday: "11:00 AM - 6:00 PM",
      },
      image: "/westside-barbershop.png",
      features: ["Modern Fades", "Skin Fades", "Beard Design", "Hair Styling"],
      manager: "Noah Bennett",
    },
    {
      id: 4,
      name: "The Haircut - Eastside",
      address: "321 Elm Street, Eastside Center, NY 10004",
      phone: "(555) 456-7890",
      email: "eastside@thehaircut.com",
      lat: 40.7282,
      lng: -73.9942,
      hours: {
        "Monday - Friday": "9:00 AM - 7:00 PM",
        Saturday: "8:00 AM - 5:00 PM",
        Sunday: "10:00 AM - 4:00 PM",
      },
      image: "/eastside-barbershop.png",
      features: ["Traditional Cuts", "Straight Razor Shaves", "Mustache Wax", "Grooming"],
      manager: "Marcus Thompson",
    },
  ]

  const handleMarkerClick = (locationId: number) => {
    setActiveTab(locationId)
  }

  const activeLocation = locations.find((loc) => loc.id === activeTab)

  return (
    <section className="py-16 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Map */}
          <div className="space-y-6 relative">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-100 mb-6">
                Our <span className="text-amber-400">Locations</span>
              </h2>
              <div className="flex flex-wrap justify-left gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>4 Convenient Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Extended Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Walk-ins Welcome</span>
                </div>
              </div>
              <p className="text-lg text-slate-300 mb-2 leading-relaxed">
                Find The Haircut barbershop nearest to you. Click on the map markers to explore each location.
              </p>
            </div>

            <LocationMap locations={locations} onMarkerClick={handleMarkerClick} activeLocationId={activeTab} />

            {/* Location Tabs */}
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setActiveTab(location.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === location.id
                      ? "bg-amber-500 text-slate-900"
                      : "bg-card text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {location.name.split(" - ")[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
            {activeLocation && (
              <>
                {/* Location Image */}
                <div className="h-64 bg-gradient-to-br from-amber-400/20 to-slate-700 relative overflow-hidden">
                  <Image fill
                    src={`/img/hero/dan-gold-07AAmZ1dECU-unsplash.jpg?height=256&width=400&query=${activeLocation.name} modern barbershop interior`}
                    alt={activeLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">{activeLocation.name}</h3>
                    <p className="text-amber-400 font-medium">Managed by {activeLocation.manager}</p>
                  </div>
                </div>

                {/* Location Details */}
                <div className="p-6">
                  {/* Address & Contact */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-300">{activeLocation.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <a
                        href={`tel:${activeLocation.phone}`}
                        className="text-slate-300 hover:text-amber-400 transition-colors"
                      >
                        {activeLocation.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <a
                        href={`mailto:${activeLocation.email}`}
                        className="text-slate-300 hover:text-amber-400 transition-colors"
                      >
                        {activeLocation.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="mb-6">
                    <h4 className="text-lg font-serif font-semibold text-slate-100 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-400" />
                      Hours
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(activeLocation.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="text-slate-400">{day}</span>
                          <span className="text-slate-300 font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-6">
                    <h4 className="text-lg font-serif font-semibold text-slate-100 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeLocation.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-sm border border-amber-400/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href="/booking"
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 py-3 px-4 rounded-lg font-medium text-center transition-colors"
                    >
                      Book Appointment
                    </Link>
                    <a
                      href={`tel:${activeLocation.phone}`}
                      className="flex-1 bg-[#393528] hover:bg-slate-600 text-slate-100 py-3 px-4 rounded-lg font-medium text-center transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

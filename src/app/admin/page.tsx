"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Scissors,
  Check,
  X,
  Edit3,
  Plus,
  Building2,
  Users,
} from "lucide-react"
import Link from "next/link"

interface Booking {
  id: string
  appointmentDate: string
  appointmentTime: string
  status: string
  notes?: string
  user: {
    name: string
    lastName: string
    phone: string
    email: string
  }
  service: {
    name: string
    price: number
    time: number
  }
  barber: {
    name: string
    image?: string
  }
  office: {
    location: string
  }
  createdAt: string
}

interface Barber {
  id: string
  name: string
  image?: string
  createdAt: string
}

interface Office {
  id: string
  location: string
  createdAt: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "barbers" | "offices">("bookings")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [offices, setOffices] = useState<Office[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [barberFilter, setBarberFilter] = useState<string>("all")

  // Form states
  const [showBarberForm, setShowBarberForm] = useState(false)
  const [showOfficeForm, setShowOfficeForm] = useState(false)
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null)
  const [editingOffice, setEditingOffice] = useState<Office | null>(null)
  const [barberForm, setBarberForm] = useState({ name: "", image: "" })
  const [officeForm, setOfficeForm] = useState({ location: "" })

  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings()
    } else if (activeTab === "barbers") {
      fetchBarbers()
    } else if (activeTab === "offices") {
      fetchOffices()
    }
  }, [activeTab, selectedDate, statusFilter, barberFilter])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedDate) params.append("date", selectedDate)
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (barberFilter !== "all") params.append("barberId", barberFilter)

      const response = await fetch(`/api/admin/bookings?${params}`)
      const data = await response.json()

      if (response.ok) {
        setBookings(data.bookings || [])
      } else {
        console.error("Error fetching bookings:", data.error)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBarbers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/barbers")
      const data = await response.json()
      if (response.ok) {
        setBarbers(data.barbers || [])
      }
    } catch (error) {
      console.error("Error fetching barbers:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOffices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/offices")
      const data = await response.json()
      if (response.ok) {
        setOffices(data.offices || [])
      }
    } catch (error) {
      console.error("Error fetching offices:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBarberSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingBarber ? `/api/admin/barbers/${editingBarber.id}` : "/api/admin/barbers"
      const method = editingBarber ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(barberForm),
      })

      if (response.ok) {
        setShowBarberForm(false)
        setEditingBarber(null)
        setBarberForm({ name: "", image: "" })
        fetchBarbers()
      } else {
        const data = await response.json()
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error saving barber:", error)
      alert("Failed to save barber")
    }
  }

  const handleOfficeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingOffice ? `/api/admin/offices/${editingOffice.id}` : "/api/admin/offices"
      const method = editingOffice ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(officeForm),
      })

      if (response.ok) {
        setShowOfficeForm(false)
        setEditingOffice(null)
        setOfficeForm({ location: "" })
        fetchOffices()
      } else {
        const data = await response.json()
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error saving office:", error)
      alert("Failed to save office")
    }
  }

  const deleteBarber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this barber?")) return

    try {
      const response = await fetch(`/api/admin/barbers/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchBarbers()
      } else {
        const data = await response.json()
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error deleting barber:", error)
      alert("Failed to delete barber")
    }
  }

  const deleteOffice = async (id: string) => {
    if (!confirm("Are you sure you want to delete this office?")) return

    try {
      const response = await fetch(`/api/admin/offices/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchOffices()
      } else {
        const data = await response.json()
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error deleting office:", error)
      alert("Failed to delete office")
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchBookings()
      } else {
        const data = await response.json()
        alert(`Error updating booking: ${data.error}`)
      }
    } catch (error) {
      console.error("Error updating booking:", error)
      alert("Failed to update booking")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = -7; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        isToday: i === 0,
      })
    }
    return dates
  }

  const dates = generateDates()
  const todayBookings = bookings.filter((booking) => booking.appointmentDate.split("T")[0] === selectedDate)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Scissors className="w-6 h-6 text-amber-600" />
              <span className="text-xl font-bold text-slate-900 font-serif">The Haircut</span>
              <span className="text-sm text-slate-500 ml-2">Admin Dashboard</span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 font-serif mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Manage bookings, barbers, and branch locations</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "bookings"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Bookings
              </button>
              <button
                onClick={() => setActiveTab("barbers")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "barbers"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Barbers
              </button>
              <button
                onClick={() => setActiveTab("offices")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "offices"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Building2 className="w-4 h-4 inline mr-2" />
                Branches
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "bookings" && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                  <div className="grid grid-cols-4 gap-2">
                    {dates.slice(7, 14).map((date) => (
                      <button
                        key={date.value}
                        onClick={() => setSelectedDate(date.value)}
                        className={`p-2 text-xs rounded-lg border transition-all ${
                          selectedDate === date.value
                            ? "border-amber-600 bg-amber-50 text-amber-700"
                            : date.isToday
                              ? "border-blue-300 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-amber-300"
                        }`}
                      >
                        {date.display}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Barber Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Barber</label>
                  <select
                    value={barberFilter}
                    onChange={(e) => setBarberFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  >
                    <option value="all">All Barbers</option>
                    <option value="ethan">Ethan Carter</option>
                    <option value="liam">Liam Harper</option>
                    <option value="noah">Noah Bennett</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 font-serif">
                  Appointments for{" "}
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {todayBookings.length} appointment{todayBookings.length !== 1 ? "s" : ""} scheduled
                </p>
              </div>

              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="text-slate-600 mt-2">Loading bookings...</p>
                </div>
              ) : todayBookings.length === 0 ? (
                <div className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No appointments found</h3>
                  <p className="text-slate-600">No bookings scheduled for the selected date and filters.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {todayBookings
                    .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
                    .map((booking) => (
                      <div key={booking.id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="font-semibold text-slate-900">{booking.appointmentTime}</span>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-bold text-slate-900 mb-2">Customer Information</h3>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-500" />
                                    <span>
                                      {booking.user.name} {booking.user.lastName}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-500" />
                                    <span>{booking.user.phone}</span>
                                  </div>
                                  {booking.user.email && (
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4 text-slate-500" />
                                      <span>{booking.user.email}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h3 className="font-bold text-slate-900 mb-2">Service Details</h3>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Scissors className="w-4 h-4 text-slate-500" />
                                    <span>{booking.service.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-500" />
                                    <span>{booking.barber.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-slate-500" />
                                    <span>{booking.office.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span>
                                      {booking.service.time} min - ${booking.service.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {booking.notes && (
                              <div className="mt-4">
                                <h4 className="font-medium text-slate-900 mb-1">Notes:</h4>
                                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{booking.notes}</p>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 ml-6">
                            {booking.status === "confirmed" && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, "completed")}
                                  className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                                >
                                  <Check className="w-3 h-3" />
                                  Complete
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                  className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                                >
                                  <X className="w-3 h-3" />
                                  Cancel
                                </button>
                              </>
                            )}
                            {booking.status === "cancelled" && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm"
                              >
                                <Edit3 className="w-3 h-3" />
                                Restore
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Confirmed</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {todayBookings.filter((b) => b.status === "confirmed").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Completed</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {todayBookings.filter((b) => b.status === "completed").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Cancelled</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {todayBookings.filter((b) => b.status === "cancelled").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Today</p>
                    <p className="text-2xl font-bold text-slate-900">{todayBookings.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "barbers" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Manage Barbers</h2>
              <button
                onClick={() => {
                  setShowBarberForm(true)
                  setEditingBarber(null)
                  setBarberForm({ name: "", image: "" })
                }}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Barber
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="text-slate-600 mt-2">Loading barbers...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {barbers.map((barber) => (
                  <div key={barber.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {barber.image ? (
                        <img
                          src={barber.image || "/placeholder.svg"}
                          alt={barber.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-slate-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{barber.name}</h3>
                        <p className="text-sm text-slate-600">
                          Added {new Date(barber.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingBarber(barber)
                          setBarberForm({ name: barber.name, image: barber.image || "" })
                          setShowBarberForm(true)
                        }}
                        className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                      >
                        <Edit3 className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBarber(barber.id)}
                        className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        <X className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Barber Form Modal */}
            {showBarberForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    {editingBarber ? "Edit Barber" : "Add New Barber"}
                  </h3>
                  <form onSubmit={handleBarberSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={barberForm.name}
                        onChange={(e) => setBarberForm({ ...barberForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                      <input
                        type="url"
                        value={barberForm.image}
                        onChange={(e) => setBarberForm({ ...barberForm, image: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowBarberForm(false)
                          setEditingBarber(null)
                        }}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        {editingBarber ? "Update" : "Add"} Barber
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "offices" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Manage Branch Locations</h2>
              <button
                onClick={() => {
                  setShowOfficeForm(true)
                  setEditingOffice(null)
                  setOfficeForm({ location: "" })
                }}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Branch
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="text-slate-600 mt-2">Loading branches...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offices.map((office) => (
                  <div key={office.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{office.location}</h3>
                        <p className="text-sm text-slate-600">
                          Added {new Date(office.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingOffice(office)
                          setOfficeForm({ location: office.location })
                          setShowOfficeForm(true)
                        }}
                        className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                      >
                        <Edit3 className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOffice(office.id)}
                        className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        <X className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Office Form Modal */}
            {showOfficeForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    {editingOffice ? "Edit Branch" : "Add New Branch"}
                  </h3>
                  <form onSubmit={handleOfficeSubmit}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={officeForm.location}
                        onChange={(e) => setOfficeForm({ ...officeForm, location: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                        placeholder="e.g., Downtown Manhattan"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowOfficeForm(false)
                          setEditingOffice(null)
                        }}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        {editingOffice ? "Update" : "Add"} Branch
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

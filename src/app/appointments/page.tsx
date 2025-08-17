/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Camera, Check } from "lucide-react"
import Image from "next/image"

interface Appointment {
  id: string
  appointmentDate: string
  appointmentTime: string
  status: "confirmed" | "cancelled" | "completed"
  service: {
    name: string
    price: number
    time: number
  }
  barber: {
    name: string
    image: string
  }
  office: {
    location: string
  }
  notes?: string
  photoUrl?: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingPhoto, setUploadingPhoto] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming")

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      // Mock data for demonstration - replace with actual API call
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          appointmentDate: "2024-01-15",
          appointmentTime: "10:00 AM",
          status: "confirmed",
          service: { name: "Classic Cut & Style", price: 45, time: 45 },
          barber: { name: "Ethan Carter", image: "/ethan-carter-barber.png" },
          office: { location: "Downtown Manhattan" },
          notes: "Fade on sides, keep length on top",
        },
        {
          id: "2",
          appointmentDate: "2024-01-08",
          appointmentTime: "2:30 PM",
          status: "completed",
          service: { name: "Beard Trim & Hot Towel", price: 35, time: 30 },
          barber: { name: "Liam Harper", image: "/liam-harper-barber-portrait.png" },
          office: { location: "Uptown Brooklyn" },
          photoUrl: "/completed-haircut-1.jpg",
        },
      ]
      setAppointments(mockAppointments)
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = async (appointmentId: string, file: File) => {
    setUploadingPhoto(appointmentId)

    try {
      // Mock photo upload - replace with actual upload logic
      const formData = new FormData()
      formData.append("photo", file)
      formData.append("appointmentId", appointmentId)

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update appointment with photo URL
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === appointmentId ? { ...apt, photoUrl: URL.createObjectURL(file) } : apt)),
      )
    } catch (error) {
      console.error("Failed to upload photo:", error)
    } finally {
      setUploadingPhoto(null)
    }
  }

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" && new Date(apt.appointmentDate) >= new Date(),
  )

  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed" || new Date(apt.appointmentDate) < new Date(),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your appointments...</p>
        </div>
      </div>
    )
  }

  return (
    
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg mb-8 max-w-md">
          <button
            onClick={() => setSelectedTab("upcoming")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              selectedTab === "upcoming" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setSelectedTab("past")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              selectedTab === "past" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {(selectedTab === "upcoming" ? upcomingAppointments : pastAppointments).map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Image width={48} height={48}
                      src={appointment.barber.image || "/placeholder.svg"}
                      alt={appointment.barber.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 font-serif">{appointment.service.name}</h3>
                      <p className="text-slate-600">with {appointment.barber.name}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(appointment.appointmentDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {appointment.appointmentTime} ({appointment.service.time} min)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{appointment.office.location}</span>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-slate-700">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-lg font-semibold text-slate-900">${appointment.service.price}</div>

                  {appointment.status === "completed" && (
                    <div className="flex items-center gap-4">
                      {appointment.photoUrl ? (
                        <div className="flex items-center gap-2">
                          <Image width={64} height={64}
                            src={appointment.photoUrl || "/placeholder.svg"}
                            alt="Finished haircut"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <span className="text-sm text-green-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Photo uploaded
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handlePhotoUpload(appointment.id, file)
                            }}
                            className="hidden"
                            id={`photo-upload-${appointment.id}`}
                          />
                          <label
                            htmlFor={`photo-upload-${appointment.id}`}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-amber-600 text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer ${
                              uploadingPhoto === appointment.id ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {uploadingPhoto === appointment.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Camera className="w-4 h-4" />
                                Upload Photo
                              </>
                            )}
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {(selectedTab === "upcoming" ? upcomingAppointments : pastAppointments).length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No {selectedTab} appointments</h3>
              <p className="text-slate-600 mb-6">
                {selectedTab === "upcoming"
                  ? "You don't have any upcoming appointments scheduled."
                  : "You don't have any past appointments yet."}
              </p>
              {selectedTab === "upcoming" && (
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Book Your First Appointment
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
  )
}

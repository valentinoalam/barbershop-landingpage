"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Calendar, Clock, Scissors, User, Check, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import FloatingChatButton from "@/components/FloatingChatButton"
import Image from "next/image"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Service {
  id: string
  name: string
  description: string
  price: number // disimpan dalam sen (mis. 2500 = $25.00), lihat schema.prisma
  durationMinutes: number
}

interface Barber {
  id: string
  name: string
  image: string
  specialty?: string
  experienceYears?: number
}

interface Office {
  id: string
  location: string
  address?: string
  phone?: string
}

interface AvailabilityResponse {
  availableSlots: string[]
  bookedSlots: string[]
  totalSlots: number
}

interface CustomerInfo {
  name: string
  phone: string
  email: string
  notes: string
}

interface DateOption {
  value: string
  display: string
  dayName: string
  fullDate: string
}

interface BookingData {
  service?: Service
  barber?: Barber
  office?: Office
  displayDate?: string
}

type FormErrors = Partial<Record<"service" | "office" | "barberDate" | "name" | "phone" | "email", string>>

const TOTAL_STEPS = 4 // Service -> Date/Barber/Time -> Your Info -> Confirmation

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
})

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Service.price di schema disimpan dalam sen (Int), bukan desimal dolar
const formatPrice = (priceInCents: number) => currencyFormatter.format(priceInCents / 100)

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({})

  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedOffice, setSelectedOffice] = useState<string>("")
  const [selectedBarber, setSelectedBarber] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    notes: "",
  })

  const [services, setServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [offices, setOffices] = useState<Office[]>([])
  const [availability, setAvailability] = useState<Record<string, AvailabilityResponse>>({})

  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  // -------------------------------------------------------------------------
  // Static helper data (fallbacks only used until the API returns real bios)
  // -------------------------------------------------------------------------

  const getBarberSpecialty = (name: string) => {
    const specialties: Record<string, string> = {
      "Ethan Carter": "Classic Cuts & Fades",
      "Liam Harper": "Modern Styles & Beard Work",
      "Noah Bennett": "Premium Shaves & Styling",
    }
    return specialties[name] || "Professional Styling"
  }

  const getBarberExperienceYears = (name: string) => {
    const experience: Record<string, number> = {
      "Ethan Carter": 8,
      "Liam Harper": 6,
      "Noah Bennett": 10,
    }
    return experience[name] ?? 5
  }

  // -------------------------------------------------------------------------
  // Data fetching
  // -------------------------------------------------------------------------

  const fetchAvailability = async (barberId: string, date: string): Promise<AvailabilityResponse> => {
    const key = `${barberId}-${date}`
    if (availability[key]) return availability[key]

    try {
      setLoading(true)
      const response = await fetch(`/api/availability?barberId=${barberId}&date=${date}`)
      const data = await response.json()

      if (response.ok) {
        setAvailability((prev) => ({ ...prev, [key]: data }))
        return data
      }
      console.error("Error fetching availability:", data.error)
      return { availableSlots: [], bookedSlots: [], totalSlots: 0 }
    } catch (error) {
      console.error("Error fetching availability:", error)
      return { availableSlots: [], bookedSlots: [], totalSlots: 0 }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setPageLoading(true)
        setPageError(null)

        const [servicesRes, barbersRes, officesRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/barbers"),
          fetch("/api/offices"),
        ])

        if (!servicesRes.ok || !barbersRes.ok || !officesRes.ok) {
          throw new Error("One or more resources failed to load")
        }

        const [servicesData, barbersData, officesData] = await Promise.all([
          servicesRes.json(),
          barbersRes.json(),
          officesRes.json(),
        ])

        setServices(servicesData.services || [])
        setBarbers(
          (barbersData.barbers || []).map((barber: Barber) => ({
            ...barber,
            specialty: barber.specialty || getBarberSpecialty(barber.name),
            experienceYears: barber.experienceYears ?? getBarberExperienceYears(barber.name),
          })),
        )

        const fetchedOffices: Office[] = officesData.offices || []
        setOffices(fetchedOffices)
        if (fetchedOffices.length === 1) {
          setSelectedOffice(fetchedOffices[0].id)
        }
      } catch (error) {
        console.error("Error fetching initial data:", error)
        setPageError("We couldn't load booking data. Please refresh the page.")
      } finally {
        setPageLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // -------------------------------------------------------------------------
  // Derived data
  // -------------------------------------------------------------------------

  const dates = useMemo<DateOption[]>(() => {
    const result: DateOption[] = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      result.push({
        value: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase(),
        fullDate: date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      })
    }
    return result
  }, [])

  const getAvailableTimeSlots = (): string[] => {
    if (!selectedBarber || !selectedDate) return []
    const key = `${selectedBarber}-${selectedDate}`
    return availability[key]?.availableSlots || []
  }

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const selectedBarberData = barbers.find((b) => b.id === selectedBarber)
  const selectedOfficeData = offices.find((o) => o.id === selectedOffice)

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const handleDateSelection = (date: DateOption) => {
    setSelectedDate(date.value)
    setBookingData((prev) => ({ ...prev, displayDate: date.fullDate }))
    setSelectedTime("")

    barbers.forEach((barber) => {
      fetchAvailability(barber.id, date.value)
    })
  }

  const handleBarberSelection = async (barber: Barber) => {
    if (!selectedDate) return
    const availabilityData = await fetchAvailability(barber.id, selectedDate)
    if (availabilityData.availableSlots.length > 0) {
      setSelectedBarber(barber.id)
      setBookingData((prev) => ({ ...prev, barber }))
      setSelectedTime("")
    }
  }

  const validateStep = async (): Promise<boolean> => {
    const nextErrors: FormErrors = {}

    if (currentStep === 1) {
      if (offices.length > 1 && !selectedOffice) nextErrors.office = "Please choose a location."
      if (!selectedService) nextErrors.service = "Please select a service."
    }

    if (currentStep === 2) {
      if (!selectedBarber || !selectedDate || !selectedTime) {
        nextErrors.barberDate = "Please select a barber, date, and time."
      } else {
        const currentAvailability = await fetchAvailability(selectedBarber, selectedDate)
        if (!currentAvailability.availableSlots.includes(selectedTime)) {
          nextErrors.barberDate = "This time slot is no longer available. Please select another time."
          setSelectedTime("")
        }
      }
    }

    if (currentStep === 3) {
      if (!customerInfo.name.trim()) nextErrors.name = "Please enter your name."
      if (!customerInfo.phone.trim()) nextErrors.phone = "Please enter your phone number."
      if (customerInfo.email.trim() && !EMAIL_REGEX.test(customerInfo.email.trim())) {
        nextErrors.email = "Please enter a valid email address."
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submitBooking = async () => {
    try {
      setSubmitting(true)
      setSubmitError(null)

      const bookingPayload = {
        serviceId: selectedService,
        barberId: selectedBarber,
        officeId: selectedOffice || offices[0]?.id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        customerInfo,
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking")
      }

      setAvailability({}) // force a refresh of availability after booking
    } catch (error) {
      console.error("Error creating booking:", error)
      setSubmitError("We couldn't confirm your booking. Please try again.")
      setCurrentStep(3)
      throw error
    } finally {
      setSubmitting(false)
    }
  }

  const nextStep = async () => {
    if (!(await validateStep())) return

    if (currentStep === 3) {
      try {
        await submitBooking()
      } catch {
        return // stay on step 3, submitError is already set
      }
    }

    setCurrentStep((step) => Math.min(step + 1, TOTAL_STEPS))
  }

  const prevStep = () => {
    setErrors({})
    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  if (pageLoading) {
    return (
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-slate-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto mb-4" />
        Loading booking page...
      </div>
    )
  }

  if (pageError) {
    return (
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-red-600">
        {pageError}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mt-32 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Barber Schedules */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 font-serif">Barber Schedules</h3>
            <div className="space-y-4">
              {barbers.map((barber) => (
                <div key={barber.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden shrink-0">
                      {barber.image && <Image
                        width={40}
                        height={40}
                        src={barber.image}
                        alt={barber.name}
                        className="w-full h-full object-cover"
                      />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{barber.name}</h4>
                      <p className="text-xs text-slate-600">{barber.specialty}</p>
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="text-center py-2">
                      {selectedDate ? (
                        (() => {
                          const key = `${barber.id}-${selectedDate}`
                          const availabilityData = availability[key]
                          if (!availabilityData) return <span className="text-slate-500">Loading...</span>
                          return (
                            <span
                              className={
                                availabilityData.availableSlots.length > 0
                                  ? "text-green-600 font-medium"
                                  : availabilityData.totalSlots > 0
                                    ? "text-red-600"
                                    : "text-slate-500"
                              }
                            >
                              {availabilityData.availableSlots.length > 0
                                ? `${availabilityData.availableSlots.length} slots available`
                                : availabilityData.totalSlots > 0
                                  ? "Fully booked"
                                  : "Not working"}
                            </span>
                          )
                        })()
                      ) : (
                        <span className="text-slate-500">Select a date to see availability</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Progress Header */}
            <div className="bg-linear-to-r from-slate-800 to-slate-700 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold font-serif">Book Your Appointment</h1>
                <div className="text-sm text-slate-300">
                  Step {currentStep} of {TOTAL_STEPS}
                </div>
              </div>
              <div className="bg-slate-600 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-amber-500 to-amber-600 h-full transition-all duration-300"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-8">
              {/* Step 1: Location + Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  {offices.length > 1 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-amber-600" />
                        <h2 className="text-2xl font-bold text-slate-900 font-serif">Choose Your Location</h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {offices.map((office) => (
                          <div
                            key={office.id}
                            onClick={() => setSelectedOffice(office.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && setSelectedOffice(office.id)}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedOffice === office.id
                                ? "border-amber-600 bg-amber-50 shadow-md"
                                : "border-slate-200 hover:border-amber-300"
                            }`}
                          >
                            <p className="font-bold text-slate-900">{office.location}</p>
                            {office.address && <p className="text-sm text-slate-500 mt-1">{office.address}</p>}
                            {office.phone && (
                              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                <Phone className="w-3.5 h-3.5" /> {office.phone}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      {errors.office && <p className="text-sm text-red-600 mt-2">{errors.office}</p>}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Scissors className="w-6 h-6 text-amber-600" />
                      <h2 className="text-2xl font-bold text-slate-900 font-serif">Choose Your Service</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => {
                            setSelectedService(service.id)
                            setBookingData((prev) => ({ ...prev, service }))
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && setSelectedService(service.id)}
                          className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                            selectedService === service.id
                              ? "border-amber-600 bg-amber-50 shadow-md"
                              : "border-slate-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-slate-900 text-lg">{service.name}</h3>
                            <div className="text-2xl font-bold text-amber-600">
                              {formatPrice(service.price)}
                            </div>
                          </div>
                          <p className="text-slate-600 flex items-center gap-1 mb-2">
                            <Clock className="w-4 h-4" />
                            {service.durationMinutes} min
                          </p>
                          <p className="text-sm text-slate-500">{service.description}</p>
                        </div>
                      ))}
                    </div>
                    {errors.service && <p className="text-sm text-red-600 mt-2">{errors.service}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Date, Time & Barber Selection */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-bold text-slate-900 font-serif">Select Date, Time & Barber</h2>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Date</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {dates.map((date) => (
                        <div
                          key={date.value}
                          onClick={() => handleDateSelection(date)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && handleDateSelection(date)}
                          className={`border-2 rounded-lg p-3 cursor-pointer transition-all text-center ${
                            selectedDate === date.value
                              ? "border-amber-600 bg-amber-50"
                              : "border-slate-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="font-semibold text-slate-900">{date.display}</div>
                          <div className="text-xs text-slate-600 mt-1">
                            {loading ? "Loading..." : "Click to select"}
                          </div>
                          <div className="flex justify-center gap-1 mt-2">
                            {barbers.map((barber) => {
                              const key = `${barber.id}-${date.value}`
                              const availabilityData = availability[key]
                              return (
                                <div
                                  key={barber.id}
                                  className={`w-2 h-2 rounded-full ${
                                    !availabilityData
                                      ? "bg-slate-300"
                                      : availabilityData.availableSlots.length > 0
                                        ? "bg-green-400"
                                        : availabilityData.totalSlots > 0
                                          ? "bg-red-400"
                                          : "bg-slate-300"
                                  }`}
                                  title={`${barber.name}: ${
                                    availabilityData
                                      ? `${availabilityData.availableSlots.length} slots available`
                                      : "Loading..."
                                  }`}
                                />
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Barber</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {barbers.map((barber) => {
                          const key = `${barber.id}-${selectedDate}`
                          const availabilityData = availability[key]
                          const availableSlots = availabilityData?.availableSlots.length || 0
                          const isWorking = (availabilityData?.totalSlots || 0) > 0

                          return (
                            <div
                              key={barber.id}
                              onClick={() => handleBarberSelection(barber)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === "Enter" && handleBarberSelection(barber)}
                              className={`border-2 rounded-lg p-4 transition-all ${
                                availableSlots === 0
                                  ? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-50"
                                  : selectedBarber === barber.id
                                    ? "border-amber-600 bg-amber-50 cursor-pointer"
                                    : "border-slate-200 hover:border-amber-300 cursor-pointer"
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden shrink-0">
                                  <Image
                                    width={48}
                                    height={48}
                                    src={barber.image || "/placeholder.svg"}
                                    alt={barber.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900">{barber.name}</h4>
                                  <p className="text-sm text-slate-600">{barber.experienceYears} years experience</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 mb-2">{barber.specialty}</p>
                              <div className="text-sm font-medium">
                                {!availabilityData ? (
                                  <span className="text-slate-500">Loading...</span>
                                ) : availableSlots > 0 ? (
                                  <span className="text-green-600">{availableSlots} slots available</span>
                                ) : isWorking ? (
                                  <span className="text-red-600">Fully booked</span>
                                ) : (
                                  <span className="text-slate-500">Not working</span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {selectedBarber && selectedDate && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Available Times</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {getAvailableTimeSlots().map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                              selectedTime === time
                                ? "border-amber-600 bg-amber-50 text-amber-700"
                                : "border-slate-200 hover:border-amber-300 text-slate-700"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {getAvailableTimeSlots().length === 0 && (
                        <p className="text-center text-slate-500 py-8">
                          No available time slots for this barber on the selected date.
                        </p>
                      )}
                    </div>
                  )}

                  {errors.barberDate && <p className="text-sm text-red-600">{errors.barberDate}</p>}
                </div>
              )}

              {/* Step 3: Customer Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-bold text-slate-900 font-serif">Your Information</h2>
                  </div>

                  {selectedServiceData && selectedBarberData && (
                    <div className="bg-slate-50 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Summary</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          {selectedOfficeData && (
                            <div className="flex justify-between">
                              <span className="text-slate-600">Location:</span>
                              <span className="font-medium text-slate-900">{selectedOfficeData.location}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-slate-600">Service:</span>
                            <span className="font-medium text-slate-900">{selectedServiceData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Duration:</span>
                            <span className="font-medium text-slate-900">{selectedServiceData.durationMinutes} min</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Barber:</span>
                            <span className="font-medium text-slate-900">{selectedBarberData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Date & Time:</span>
                            <span className="font-medium text-slate-900">
                              {bookingData.displayDate?.split(",")[0]}, {selectedTime}
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 border-t pt-2 mt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-amber-600">{formatPrice(selectedServiceData.price)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
                      {submitError}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                          errors.name
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-amber-600 focus:ring-amber-600"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                        <Phone className="w-4 h-4" /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                          errors.phone
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-amber-600 focus:ring-amber-600"
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email (Optional)</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                          errors.email
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-amber-600 focus:ring-amber-600"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                        placeholder="Any special requests or notes for your barber..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="text-center space-y-6">
                  {submitting ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 font-serif">Processing Your Booking...</h2>
                      <p className="text-slate-600">Please wait while we confirm your appointment.</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-10 h-10 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">Booking Confirmed!</h2>
                        <p className="text-lg text-slate-600 max-w-md mx-auto">
                          Thank you! Your appointment has been scheduled. We&apos;ll send you a confirmation via text
                          message.
                        </p>
                      </div>

                      {selectedServiceData && selectedBarberData && (
                        <div className="bg-slate-50 rounded-xl p-6 text-left max-w-md mx-auto">
                          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Appointment Details</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Name:</span>
                              <span className="font-medium text-slate-900">{customerInfo.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Service:</span>
                              <span className="font-medium text-slate-900">{selectedServiceData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Barber:</span>
                              <span className="font-medium text-slate-900">{selectedBarberData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Date & Time:</span>
                              <span className="font-medium text-slate-900">
                                {bookingData.displayDate?.split(",")[0]}, {selectedTime}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-3 text-lg font-bold">
                              <span>Total:</span>
                              <span className="text-amber-600">{formatPrice(selectedServiceData.price)}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-6">
                        <Link
                          href="/"
                          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
                        >
                          Return to Home
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Navigation */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-12 pt-6 border-t border-slate-200">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                      currentStep === 1
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={loading || submitting}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : currentStep === 3 ? (
                      "Confirm Booking"
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FloatingChatButton />
    </div>
  )
}
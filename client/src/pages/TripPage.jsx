import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPinIcon, DollarSignIcon, UserIcon, UtensilsIcon, CompassIcon } from "lucide-react"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"
import { TravelItinerary } from "../model/ItineraryResponse"

export default function PlannerPage() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7)
  })
  const [destinationPlace, setDestinationPlace] = useState("")
  const [budget, setBudget] = useState("")
  const [travelStyle, setTravelStyle] = useState("")
  const [interestsNew, setInterestsNew] = useState("Nature,Adventure,Famous Landmarks")
  const [accommodationType, setAccommodationType] = useState("Hotel")
  const [transportationType, setTransportationType] = useState("Public Transport")
  const [activityType, setActivityType] = useState("")
  const [cuisineType, setCuisineType] = useState("")
  const [language, setLanguage] = useState("English")
  const [peopleCount, setPeopleCount] = useState(1)
  const [selectedBadges, setSelectedBadges] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const countDays = (start, end) => {
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tripDuration = date?.from && date?.to ? countDays(date.from, date.to) : 0;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/getPlaces`,
        {
          destinationCountry: destinationPlace,
          budget,
          travelStyle,
          interestsNew,
          accommodationType,
          transportationType,
          activityType,
          cuisineType,
          tripDuration,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { unique_id } = response.data;
        navigate(`/travel?id=${unique_id}`);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    } finally {
      setLoading(false);
    }
};

  const handleBadgeClick = (badge) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((item) => item !== badge) : [...prev, badge]
    )
    setActivityType(selectedBadges.join(", "))
  }

  const badgeData = [
    { id: "kidFriendly", icon: <BabyIcon className="mr-2 h-4 w-4" />, label: "Kid Friendly" },
    { id: "museums", icon: <LibraryIcon className="mr-2 h-4 w-4" />, label: "Museums" },
    { id: "shopping", icon: <ShoppingCartIcon className="mr-2 h-4 w-4" />, label: "Shopping" },
    { id: "historical", icon: <CalendarIcon className="mr-2 h-4 w-4" />, label: "Historical" },
    { id: "outdoorAdventures", icon: <MountainIcon className="mr-2 h-4 w-4" />, label: "Outdoor Adventures" },
    { id: "artCultural", icon: <PaletteIcon className="mr-2 h-4 w-4" />, label: "Art & Cultural" },
    { id: "amusementParks", icon: <RollerCoasterIcon className="mr-2 h-4 w-4" />, label: "Amusement Parks" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <Card className="w-full max-w-4xl bg-white shadow-xl border border-gray-200">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-black">Plan Your Next Adventure</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center text-sm font-medium text-gray-700">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  Destination
                </Label>
                <Select value={destinationPlace} onValueChange={setDestinationPlace}>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Delhi", "Mumbai", "Bangalore", "Goa", "Paris", "London", "New York", "Tokyo"].map((city) => (
                      <SelectItem key={city.toLowerCase()} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSignIcon className="mr-2 h-4 w-4" />
                  Budget
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter your budget in $"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium text-gray-700">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Travel Dates
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium text-gray-700">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Number of Travelers
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPeopleCount((prev) => Math.max(prev - 1, 1))}
                  >
                    -
                  </Button>
                  <Input value={peopleCount} readOnly className="w-16 text-center" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPeopleCount((prev) => prev + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuisine" className="flex items-center text-sm font-medium text-gray-700">
                  <UtensilsIcon className="mr-2 h-4 w-4" />
                  Preferred Cuisine
                </Label>
                <Select value={cuisineType} onValueChange={setCuisineType}>
                  <SelectTrigger id="cuisine">
                    <SelectValue placeholder="Select cuisine type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["American", "Italian", "Asian", "Mexican", "Vegetarian"].map((cuisine) => (
                      <SelectItem key={cuisine.toLowerCase()} value={cuisine.toLowerCase()}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="travel-style" className="flex items-center text-sm font-medium text-gray-700">
                  <CompassIcon className="mr-2 h-4 w-4" />
                  Travel Style
                </Label>
                <Select value={travelStyle} onValueChange={setTravelStyle}>
                  <SelectTrigger id="travel-style">
                    <SelectValue placeholder="Select travel style" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Adventure", "Relaxation", "Cultural", "Family", "Solo"].map((style) => (
                      <SelectItem key={style.toLowerCase()} value={style.toLowerCase()}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Activities</Label>
              <div className="flex flex-wrap gap-2">
                {badgeData.map((badge) => (
                  <Badge
                    key={badge.id}
                    variant={selectedBadges.includes(badge.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedBadges.includes(badge.id) ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                    }`}
                    onClick={() => handleBadgeClick(badge.id)}
                  >
                    {badge.icon}
                    {badge.label}
                  </Badge>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
              {loading ? "Creating Trip..." : "Create New Trip"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-center text-gray-500">
            By clicking Create New Trip, you agree to our{" "}
            <a href="#" className="text-black hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-black hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// SVG Icons as Functional Components
function BabyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </svg>
  )
}

function LibraryIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path  d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function PaletteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

function RollerCoasterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 19V5" />
      <path d="M10 19V6.8" />
      <path d="M14 19v-7.8" />
      <path d="M18 5v4" />
      <path d="M18 19v-6" />
      <path d="M22 19V9" />
      <path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" />
    </svg>
  )
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
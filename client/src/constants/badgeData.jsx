import { BabyIcon } from "../assets/icons/BabyIcon";
import { CalendarIcon } from "../assets/icons/CalendarIcon";
import { LibraryIcon } from "../assets/icons/LibraryIcon";
import { MountainIcon } from "../assets/icons/MountainIcon";
import { PaletteIcon } from "../assets/icons/PaletteIcon";
import { RollerCoasterIcon } from "../assets/icons/RollercoasterIcon";
import { ShoppingCartIcon } from "../assets/icons/ShoppingCartIcon";

export const badgeData = [
  {
    id: "kidFriendly",
    icon: <BabyIcon className="mr-2 h-4 w-4" />,
    label: "Kid Friendly",
  },
  {
    id: "museums",
    icon: <LibraryIcon className="mr-2 h-4 w-4" />,
    label: "Museums",
  },
  {
    id: "shopping",
    icon: <ShoppingCartIcon className="mr-2 h-4 w-4" />,
    label: "Shopping",
  },
  {
    id: "historical",
    icon: <CalendarIcon className="mr-2 h-4 w-4" />,
    label: "Historical",
  },
  {
    id: "outdoorAdventures",
    icon: <MountainIcon className="mr-2 h-4 w-4" />,
    label: "Outdoor Adventures",
  },
  {
    id: "artCultural",
    icon: <PaletteIcon className="mr-2 h-4 w-4" />,
    label: "Art & Cultural",
  },
  {
    id: "amusementParks",
    icon: <RollerCoasterIcon className="mr-2 h-4 w-4" />,
    label: "Amusement Parks",
  },
];

export const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Goa",
  "Paris",
  "London",
  "Punjab",
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Seattle",
  "Miami",
  "Las Vegas",
  "Orlando",
  "Hawaii",
  "Tokyo",
  "Kyoto",
  "Osaka",
  "Nara",
  "Hokkaido",
  "Okinawa",
  "Seoul",
  "Busan",
  "Jeju",
  "Jeonju",
  "Gangneung",
];

export const cuisineType = [
  "American",
  "Italian",
  "Asian",
  "Mexican",
  "Vegetarian",
];

export const travelType = [
  "Adventure",
  "Relaxation",
  "Cultural",
  "Family",
  "Solo",
];

export const data = {
    interestsNew: "Nature,Adventure,Famous Landmarks",
    accommodationType: "Hotel",
    transportationType: "Public Transport",
    language: "English",
    
}
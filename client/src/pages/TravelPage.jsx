import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import axios from "axios";
import { extractJsonString } from "../lib/extractJsonString";
import {
  Activity,
  Bed,
  Clock,
  DollarSign,
  MapPin,
  Navigation,
  Printer,
  Utensils,
} from "lucide-react";

const svgIcon = encodeURIComponent(
  `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c-5.522 0-10 4.394-10 9.815 0 5.505 4.375 9.268 10 14.185 5.625-4.917 10-8.68 10-14.185 0-5.421-4.478-9.815-10-9.815zm0 18c-4.419 0-8-3.582-8-8s3.581-8 8-8c4.419 0 8 3.582 8 8s-3.581 8-8 8zm-3.61-7.202l2.831-1.402-2.902-2.475.898-.444 4.697 1.586 2.244-1.111c.592-.297 1.569-.217 1.791.231.035.071.051.152.051.239-.002.458-.46 1.078-.953 1.325l-2.244 1.111-1.586 4.698-.898.444-.209-3.808-2.832 1.401-.584 1.408-.628.31-.219-2.126-1.559-1.464.628-.311 1.474.388z"/></svg>`
);
const iconUrl = `data:image/svg+xml,${svgIcon}`;

const getCoordinates = async (place) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    place
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const results = response.data.results;
    if (results.length > 0) {
      const location = results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.error("No results found for place:", place);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const TravelMap = ({ locations, center, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ["geometry", "drawing"],
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      zoom={zoom}
      center={center}
    >
      {/* Add Polyline to connect the locations */}
      {locations.length > 1 && (
        <PolylineF
          path={locations.map((location) => ({
            lat: location.lat,
            lng: location.lng,
          }))}
          options={{
            strokeColor: "#000000", // Change this color as needed
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      )}
      {/* Ensure markers are visible */}
      {locations.map((location, index) => (
        <MarkerF
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          label={location.label}
          icon={{
            url: iconUrl,
            scaledSize: new window.google.maps.Size(24, 24),
          }}
        >
          {location.active && (
            <InfoWindow>
              <div style={{ padding: "5px", color: "#FF0000" }}></div>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

TravelMap.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  zoom: PropTypes.number.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default function TravelPage() {
  const location = useLocation();
  const [itineraryData, setItineraryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mapsData, setMapsData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(15); // Adjust the initial zoom level

  useEffect(() => {
    const getItineraryData = async () => {
      setLoading(true); // Assuming setLoading is defined to control the loading state
      const query = new URLSearchParams(location.search);
      const uniqueId = query.get("id"); // Assuming the URL parameter is named 'id'
      if (uniqueId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getTripDetails/${uniqueId}`);
          const { data } = response;
          if (data && data.itinerary) {
            const clearData = JSON.parse(extractJsonString(data.itinerary.choices[0].message.content));
            setItineraryData(clearData); // Assuming setItineraryData is defined to update the itinerary state
            const coordinatesPromises = clearData.itinerary.flatMap((dayPlan) =>
              dayPlan.activities.map((activity) =>
                getCoordinates(activity.location) // Assuming getCoordinates is defined to fetch coordinates
              )
            );
            const coordinates = await Promise.all(coordinatesPromises);
            const validCoordinates = coordinates.filter((coord) => coord !== null);
            setMapsData(validCoordinates); // Assuming setMapsData is defined to update the map data state
  
            // Set initial center and zoom based on the first valid location
            if (validCoordinates.length > 0) {
              setMapCenter(validCoordinates[0]); // Assuming setMapCenter is defined to update the map center
            }
          }
        } catch (error) {
          console.error("Error fetching trip details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getItineraryData();
  }, [location.search]);

  const handlePrint = () => {
    window.print();
  };

  const { destinationCountry, budget, itinerary } = itineraryData;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <svg
          width={50}
          height={50}
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80,200"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0;-30;-124"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Your Trip to {itineraryData.destinationCountry}
            </h1>
            <p className="text-xl mt-2">
              {itineraryData.tripDuration} Days of Adventure
            </p>
          </div>
          <Button
            onClick={handlePrint}
            variant="outline"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Trip Map</h2>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="h-[500px] flex items-center flex-col justify-center">
              <TravelMap
                locations={mapsData}
                center={mapCenter}
                zoom={mapZoom}
              />
              <span className="ml-4 text-xl text-gray-600">
                Map of {itineraryData.destinationCountry}
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Itinerary</h2>
          {itineraryData.itinerary.map((day, index) => (
            <div
              key={index}
              className="mb-12 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
            >
              <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-semibold">
                  Day {day.day} -{" "}
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-black hover:bg-gray-100 border-white"
                  onClick={async (e) => {
                    e.preventDefault();
                    const searchPlaces = async () => {
                      const places = itinerary.flatMap((dayPlan) =>
                        dayPlan.activities.map((activity) => activity.location)
                      );

                      const coordinatesPromises = places.map((place) =>
                        getCoordinates(place)
                      );
                      const coordinates = await Promise.all(
                        coordinatesPromises
                      );

                      const locationsWithMarkers = coordinates.map(
                        (coord, index) => ({
                          ...coord,
                          label: places[index] || `Place ${index + 1}`,
                        })
                      );

                      setMapsData(
                        locationsWithMarkers.filter((coord) => coord !== null)
                      );

                      if (locationsWithMarkers.length > 0) {
                        setMapCenter(locationsWithMarkers[0]);
                        setMapZoom(15);
                      }
                    };

                    const scrollToTop = () => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    };

                    await searchPlaces();
                    scrollToTop();
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Locate Place
                </Button>
              </div>
              <div className="p-6 space-y-8">
                <div>
                  <h4 className="text-xl font-semibold flex items-center mb-4">
                    <Activity className="w-6 h-6 mr-2 text-gray-700" />{" "}
                    Activities
                  </h4>
                  <ul className="space-y-4">
                    {day.activities.map((activity, actIndex) => (
                      <li
                        key={actIndex}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-lg">
                              {activity.activity}
                            </p>
                            <p className="text-gray-600 mt-1 flex items-center">
                              <Clock className="w-4 h-4 mr-1" /> {activity.time}
                            </p>
                            <p className="text-gray-600 mt-1 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />{" "}
                              {activity.location}
                            </p>
                          </div>
                          <p className="text-gray-600 font-medium flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />{" "}
                            {activity.cost}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold flex items-center mb-4">
                    <Utensils className="w-6 h-6 mr-2 text-gray-700" /> Meals
                  </h4>
                  <ul className="space-y-4">
                    {day.meals.map((meal, mealIndex) => (
                      <li
                        key={mealIndex}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-lg">
                              {meal.mealType} at {meal.restaurant}
                            </p>
                            <p className="text-gray-600 mt-1">
                              Cuisine: {meal.cuisine}
                            </p>
                            <p className="text-gray-600 mt-1 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />{" "}
                              {meal.location}
                            </p>
                          </div>
                          <p className="text-gray-600 font-medium flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" /> {meal.cost}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CarIcon(props) {
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
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function FlameIcon(props) {
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
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function SunIcon(props) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

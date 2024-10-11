import axios from 'axios';

export const getCoordinates = async (place) => {
  const apiKey = "AIzaSyDZ9xpCY1-z6OGRLKBaCZ37RyJj9A2x8TI";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${apiKey}`;

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
      console.error('No results found for place:', place);
      return null;
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};
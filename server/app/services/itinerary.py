import json

import httpx
import requests
from sqlalchemy.orm import Session

from app.config import settings
from app.models.places import Place


def create_prompt(request_data, db: Session):
    destinationCountry = request_data["destinationCountry"]
    places = db.query(Place).filter(Place.city == destinationCountry).all()
    place_info = ""
    if len(places) != 0:
        place_info = "Here are some popular places in {destinationCountry}:\n"
        for place in places[:5]:
            place_info += f"- {place.name}: {place.significance}\n"
    prompt_template = """
    Generate a personalized travel itinerary for a trip to {destinationCountry} with a budget of {budget}. 
    The traveler is interested in a {travelStyle} vacation and enjoys {interestsNew}. 
    They are looking for {accommodationType} accommodations and prefer {transportationType} transportation. 
    The itinerary should include {activityType} activities and {cuisineType} dining options. 
    Please provide a detailed itinerary with daily recommendations for {tripDuration} days, including suggested destinations, activities, and dining options.
    
    {place_info}

    The response should be in the following fixed JSON format:
    {json_format}
    // Make sure the response adheres to this JSON structure exactly, with entries for each day of the trip.
    """

    json_format = {
        "destinationCountry": request_data["destinationCountry"],
        "budget": request_data["budget"],
        "tripDuration": request_data["tripDuration"],
        "travelStyle": request_data["travelStyle"],
        "interests": request_data["interestsNew"],
        "accommodationType": request_data["accommodationType"],
        "transportationType": request_data["transportationType"],
        "itinerary": [
            {
                "day": 1,
                "date": "YYYY-MM-DD",
                "activities": [
                    {
                        "time": "HH:MM AM/PM",
                        "activity": "Description of the activity",
                        "location": "Location name or address",
                        "cost": "Estimated cost of the activity",
                    }
                ],
                "meals": [
                    {
                        "mealType": "Breakfast/Lunch/Dinner",
                        "restaurant": "Name of the restaurant",
                        "cuisine": request_data["cuisineType"],
                        "location": "Location name or address",
                        "cost": "Estimated cost of the meal",
                    }
                ],
                "accommodation": {
                    "name": "Name of the accommodation",
                    "type": request_data["accommodationType"],
                    "location": "Location name or address",
                    "costPerNight": "Cost per night",
                },
            }
        ],
        "language": request_data["language"],
    }

    return prompt_template.format(
        **request_data,
        json_format=json.dumps(json_format, indent=2),
        place_info=place_info,
    )


def generate_itinerary(request_data, db):
    prompt = create_prompt(request_data, db)
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        json={
            "messages": [{"role": "user", "content": prompt}],
            "model": "llama3-70b-8192",
        },
        headers={
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json",
        },
    )
    if response.status_code != 200:
        raise Exception("Error generating itinerary")
    return response.json()

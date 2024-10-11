export class TravelItineraryData {
  constructor(destinationCity, budget, travelStyle, interests, accommodationType, transportationType, itinerary, language) {
    this.destinationCity = destinationCity;
    this.budget = budget;
    this.travelStyle = travelStyle;
    this.interests = interests;
    this.accommodationType = accommodationType;
    this.transportationType = transportationType;
    this.itinerary = itinerary;
    this.language = language;
  }
}

export class DayItinerary {
  constructor(day, date, activities, meals, accommodation) {
    this.day = day;
    this.date = date;
    this.activities = activities;
    this.meals = meals;
    this.accommodation = accommodation;
  }
}

export class Activity {
  constructor(time, activity, location, cost) {
    this.time = time;
    this.activity = activity;
    this.location = location;
    this.cost = cost;
  }
}

export class Meal {
  constructor(mealType, restaurant, cuisine, location, cost) {
    this.mealType = mealType;
    this.restaurant = restaurant;
    this.cuisine = cuisine;
    this.location = location;
    this.cost = cost;
  }
}

export class Accommodation {
  constructor(name, type, location, costPerNight) {
    this.name = name;
    this.type = type;
    this.location = location;
    this.costPerNight = costPerNight;
  }
}

import hashlib
import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.tripdata import TripData
from app.schemas.user import UserInDB
from app.services.itinerary import generate_itinerary
from app.utils.auth import get_current_user

router = APIRouter()


def generate_unique_id(request_data: dict) -> str:
    sorted_data = json.dumps(request_data, sort_keys=True)
    return hashlib.sha256(sorted_data.encode()).hexdigest()


@router.post("/getPlaces")
def get_places(
    request_data: dict,
    current_user: UserInDB = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        unique_id = generate_unique_id(request_data)
        existing_trip = (
            db.query(TripData).filter(TripData.unique_id == unique_id).first()
        )
        if existing_trip:
            return {"unique_id": unique_id, "message": "Trip data already exists"}
        itinerary = generate_itinerary(request_data, db)
        trip_data = TripData(unique_id=unique_id, itinerary=itinerary)
        db.add(trip_data)
        db.commit()
        return {"unique_id": unique_id, "message": "Trip data stored successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500, detail="An error occurred while processing the request"
        )


@router.get("/getTripDetails/{unique_id}")
def get_trip_details(unique_id: str, db: Session = Depends(get_db)):
    trip_data = db.query(TripData).filter(
        TripData.unique_id == unique_id).first()
    if not trip_data:
        raise HTTPException(status_code=404, detail="Trip data not found")
    return {"unique_id": trip_data.unique_id, "itinerary": trip_data.itinerary}

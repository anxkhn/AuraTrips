from sqlalchemy import JSON, Column, String

from app.database import Base


class TripData(Base):
    __tablename__ = "trip_data"
    unique_id = Column(String, primary_key=True, index=True)
    itinerary = Column(JSON)

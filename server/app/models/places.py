from sqlalchemy import Column, Float, Integer, String

from app.database import Base


class Place(Base):
    __tablename__ = "places"
    id = Column(Integer, primary_key=True, index=True)
    zone = Column(String)
    state = Column(String)
    city = Column(String, index=True)
    name = Column(String)
    type = Column(String)
    establishment_year = Column(String)
    time_needed = Column(Float)
    google_rating = Column(Float)
    entrance_fee = Column(Float)
    airport_nearby = Column(String)
    weekly_off = Column(String)
    significance = Column(String)
    dslr_allowed = Column(String)
    num_reviews = Column(Float)
    best_time = Column(String)

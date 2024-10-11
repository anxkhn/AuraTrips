from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, SessionLocal, engine
from app.routes import auth, itinerary
from app.utils.csv_ingestion import ingest_csv

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(itinerary.router, prefix="/api", tags=["itinerary"])
db = SessionLocal()
ingest_csv(db, "places.csv")
db.close()


@app.get("/")
async def root():
    return {"message": "Server is running"}

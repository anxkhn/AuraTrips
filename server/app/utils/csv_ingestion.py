import csv

from sqlalchemy.orm import Session

from app.models.places import Place


def ingest_csv(db: Session, file_path: str):
    with open(file_path, "r") as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            place = Place(
                zone=row["Zone"],
                state=row["State"],
                city=row["City"],
                name=row["Name"],
                type=row["Type"],
                establishment_year=(
                    str(row["Establishment Year"])
                    if row["Establishment Year"]
                    else None
                ),
                time_needed=(
                    float(row["time needed to visit in hrs"])
                    if row["time needed to visit in hrs"]
                    else None
                ),
                google_rating=(
                    float(row["Google review rating"])
                    if row["Google review rating"]
                    else None
                ),
                entrance_fee=(
                    float(row["Entrance Fee in INR"])
                    if row["Entrance Fee in INR"]
                    else None
                ),
                airport_nearby=row["Airport with 50km Radius"],
                weekly_off=row["Weekly Off"],
                significance=row["Significance"],
                dslr_allowed=row["DSLR Allowed"],
                num_reviews=(
                    float(row["Number of google review in lakhs"])
                    if row["Number of google review in lakhs"]
                    else None
                ),
                best_time=row["Best Time to visit"],
            )
            db.add(place)
        db.commit()

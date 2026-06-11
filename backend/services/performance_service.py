from sqlalchemy.orm import Session
from models.performance import Performance

def save_performances(db: Session, items: list):
    for item in items:
        exists = db.query(Performance).filter(
            Performance.title == item["title"]
        ).first()

        if not exists:
            db.add(Performance(
                title=item["title"],
                category=item.get("category", "뮤지컬"),
                ticketing_open_date=item.get("date", "")
            ))

    db.commit()
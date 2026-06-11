from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.performance import Performance

router = APIRouter()


# DB 저장 함수 (crawl에서 사용)
def save_performances(db: Session, items: list):
    for item in items:
        exists = db.query(Performance).filter(
            Performance.title == item["title"]
        ).first()

        if not exists:
            db.add(Performance(
                title=item["title"],
                place=item["place"],
                category="musical"
            ))

    db.commit()


# 전체 조회
@router.get("/")
def get_performances(db: Session = Depends(get_db)):
    return db.query(Performance).order_by(
        Performance.ticketing_open_date.desc()
    ).all()


# 검색
@router.get("/search")
def search(q: str, db: Session = Depends(get_db)):
    return db.query(Performance).filter(
        Performance.title.contains(q)
    ).all()
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.alert import Alert
from pydantic import BaseModel

router = APIRouter()

class AlertCreate(BaseModel):
    user_id: int
    performance_id: int
    alert_types: str = "D-1,오픈직전"

@router.post("/")
def create_alert(data: AlertCreate, db: Session = Depends(get_db)):
    alert = Alert(**data.dict())
    db.add(alert)
    db.commit()
    return {"message": "알림 등록 완료"}

@router.get("/{user_id}")
def get_alerts(user_id: int, db: Session = Depends(get_db)):
    return db.query(Alert).filter(Alert.user_id == user_id).all()
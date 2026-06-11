from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.transfer import Transfer
from pydantic import BaseModel

router = APIRouter()

class TransferCreate(BaseModel):
    seller_id: int
    performance_id: int
    seat_info: str
    original_price: int
    transfer_price: int
    quantity: int = 1
    trade_method: str

@router.get("/")
def get_transfers(db: Session = Depends(get_db)):
    return db.query(Transfer).filter(Transfer.status == "판매중").all()

@router.post("/")
def create_transfer(data: TransferCreate, db: Session = Depends(get_db)):
    transfer = Transfer(**data.dict())
    db.add(transfer)
    db.commit()
    return {"message": "양도글 등록 완료"}
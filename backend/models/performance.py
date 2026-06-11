from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Performance(Base):
    __tablename__ = "performances"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    place = Column(String)
    category = Column(String, default="musical")

    ticketing_open_date = Column(DateTime, default=datetime.utcnow)
from sqlalchemy import Column, Integer, ForeignKey, Boolean, String
from database import Base

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    performance_id = Column(Integer, ForeignKey("performances.id"))
    alert_types = Column(String, default="D-1,오픈직전")
    is_active = Column(Boolean, default=True)
    
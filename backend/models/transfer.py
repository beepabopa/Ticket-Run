from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Transfer(Base):
    __tablename__ = "transfers"
    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("users.id"))
    performance_id = Column(Integer, ForeignKey("performances.id"))
    seat_info = Column(String)
    original_price = Column(Integer)
    transfer_price = Column(Integer)
    quantity = Column(Integer, default=1)
    status = Column(String, default="판매중")
    trade_method = Column(String)
    
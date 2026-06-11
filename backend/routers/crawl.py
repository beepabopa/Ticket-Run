from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from crawlers.nolticket import crawl_nolticket
from routers.performances import save_performances

router = APIRouter()


@router.get("/nolticket")
async def run_crawl(db: Session = Depends(get_db)):
    data = await crawl_nolticket()

    save_performances(db, data)

    return {
        "count": len(data),
        "data": data
    }
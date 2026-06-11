from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

from routers import performances, auth, alerts, transfers, crawl

# DB 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI(title="티켓런 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers 연결
app.include_router(performances.router, prefix="/performances", tags=["공연"])
app.include_router(auth.router, prefix="/auth", tags=["인증"])
app.include_router(alerts.router, prefix="/alerts", tags=["알림"])
app.include_router(transfers.router, prefix="/transfers", tags=["양도"])
app.include_router(crawl.router, prefix="/crawl", tags=["크롤링"])


@app.get("/")
def root():
    return {"message": "TicketRun API 🎫"}
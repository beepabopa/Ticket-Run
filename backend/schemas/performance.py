from pydantic import BaseModel

class PerformanceSchema(BaseModel):
    id: int
    title: str
    category: str
    ticketing_open_date: str | None = None

from pydantic import BaseModel, ConfigDict

class PerformanceSchema(BaseModel):
    id: int
    title: str
    category: str
    ticketing_open_date: str | None = None

    model_config = ConfigDict(from_attributes=True)

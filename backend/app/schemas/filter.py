from pydantic import BaseModel, Field


class PaginationParams(BaseModel):
    skip: int = Field(0, ge=0, description="Number of items to skip")
    take: int = Field(10, ge=1, le=100, description="Number of items to take")

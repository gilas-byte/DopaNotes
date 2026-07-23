from pydantic import BaseModel
from typing import Optional

class taskCreate(BaseModel):
    title: str
    description: Optional[str] = None

class taskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class habitCreate(BaseModel):
    title: str

class habitUpdate(BaseModel):
    title: Optional[str] = None
    is_completed: Optional[bool] = None
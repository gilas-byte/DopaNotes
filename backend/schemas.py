from pydantic import BaseModel
from typing import Optional

class TarefaCriar(BaseModel):
    title: str
    description: Optional[str] = None # Usamos Optional porque você sugeriu que a descrição poderia ser opcional!

class TarefaAtualizar(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class HabitoCriar(BaseModel):
    title: str

class HabitoAtualizar(BaseModel):
    title: Optional[str] = None
    is_completed: Optional[bool] = None
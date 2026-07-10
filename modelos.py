from sqlalchemy import Column, Integer, String, Boolean, DateTime
import datetime
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios" 

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)

class Tarefa(Base):
    __tablename__ = "tarefas"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    is_completed = Column(Boolean, default=False)
    scheduled_date = Column(DateTime, default=datetime.datetime.now)

class Habito(Base):
    __tablename__ = "habitos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    streak = Column(Integer, default=0)
    last_check = Column(DateTime, default=None)
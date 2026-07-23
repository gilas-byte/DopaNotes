from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# The database URL, read from the environment
database_url = os.environ["DATABASE_URL"]

# The engine that actually connects to the database
engine = create_engine(database_url)

# The session factory (each request to our API opens a session)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# The base class used to declare our tables
Base = declarative_base()

# Helper the API uses to open and close the database connection correctly
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

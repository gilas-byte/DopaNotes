from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# A URL que acabamos de montar
URL_DO_BANCO = os.environ["DATABASE_URL"]

# O "motor" que efetivamente conecta ao banco
engine = create_engine(URL_DO_BANCO)

# A fábrica de sessões (cada requisição à nossa API abrirá uma sessão)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# A classe base que usaremos para criar nossas tabelas
Base = declarative_base()

# Uma função auxiliar para a API pegar e fechar a conexão com o banco corretamente
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
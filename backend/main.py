from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import backend.modelos as modelos, backend.schemas as schemas
from backend.database import engine, get_db
import datetime

# Cria as tabelas no banco de dados
modelos.Base.metadata.create_all(bind=engine)

app = FastAPI(title="DopaNotes API")

origens_permitidas = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origens_permitidas,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"mensagem": "Bem-vindo ao backend do DopaNotes!"}

@app.post("/tarefas/")
def criar_tarefa(tarefa: schemas.TarefaCriar, db: Session = Depends(get_db)):
    nova_tarefa = modelos.Tarefa(title=tarefa.title, description=tarefa.description)
    
    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)
    
    return nova_tarefa

@app.get("/tarefas/")
def ler_tarefas(db: Session = Depends(get_db)):
    tarefas = db.query(modelos.Tarefa).all()
    return tarefas

@app.put("/tarefas/{tarefa_id}")
def atualizar_tarefa(tarefa_id: int, tarefa_atualizada: schemas.TarefaAtualizar, db: Session = Depends(get_db)):
    tarefa_encontrada = db.query(modelos.Tarefa).filter(modelos.Tarefa.id == tarefa_id).first()
    if tarefa_encontrada == None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    else:
        if not tarefa_atualizada.title == None:
            tarefa_encontrada.title = tarefa_atualizada.title
        if not tarefa_atualizada.description == None:
            tarefa_encontrada.description = tarefa_atualizada.description
        if not tarefa_atualizada.is_completed == None:
            tarefa_encontrada.is_completed = tarefa_atualizada.is_completed
        db.commit()
        db.refresh(tarefa_encontrada)
        return tarefa_encontrada
    
@app.delete("/tarefas/{tarefa_id}")
def deletar_tarefa(tarefa_id: int, db: Session = Depends(get_db)):
    tarefa_encontrada = db.query(modelos.Tarefa).filter(modelos.Tarefa.id == tarefa_id).first()
    if tarefa_encontrada == None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    else:
        db.delete(tarefa_encontrada)
        db.commit()

        return {"mensagem": "Tarefa deletada com sucesso!"}
    
@app.post("/habitos/")
def criar_habito(habito: schemas.HabitoCriar, db: Session = Depends(get_db)):
    novo_habito = modelos.Habito(title=habito.title)

    db.add(novo_habito)
    db.commit()
    db.refresh(novo_habito)

    return novo_habito

@app.get("/habitos/")
def ler_habitos(db: Session = Depends(get_db)):
    habitos = db.query(modelos.Habito).all()
    return habitos

@app.put("/habitos/{habito_id}")
def atualizar_habito(habito_id: int, habito_atualizado: schemas.HabitoAtualizar, db: Session = Depends(get_db)):
    habito_encontrado = db.query(modelos.Habito).filter(modelos.Habito.id == habito_id).first()
    if habito_encontrado == None:
        raise HTTPException(status_code=404, detail="Habito não encontrado")
    else:
        momentDate = datetime.datetime.now()
        if not habito_atualizado.title == None:
            habito_encontrado.title = habito_atualizado.title
        if habito_atualizado.is_completed == True:
            if habito_encontrado.last_check == None or momentDate.date() != habito_encontrado.last_check.date():
                habito_encontrado.last_check = momentDate
                habito_encontrado.streak += 1
        else:
            if habito_atualizado.is_completed == False:
                if habito_encontrado.last_check and momentDate.date() == habito_encontrado.last_check.date():
                    if habito_encontrado.streak > 0:
                        habito_encontrado.streak -= 1
                        habito_encontrado.last_check = momentDate - datetime.timedelta(days=1)
                    else:
                        habito_encontrado.last_check = None
        db.commit()
        db.refresh(habito_encontrado)

        return habito_encontrado

@app.delete("/habitos/{habito_id}")
def deletar_habito(habito_id: int, db: Session = Depends(get_db)):
    habito_encontrado = db.query(modelos.Habito).filter(modelos.Habito.id == habito_id).first()
    if habito_encontrado == None:
        raise HTTPException(status_code=404, detail="Habito não encontrado!")
    else:
        db.delete(habito_encontrado)
        db.commit()

        return {"mensagem": "Habito deletado com sucesso!"}
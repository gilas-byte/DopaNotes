from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import backend.models as models, backend.schemas as schemas
from backend.database import engine, get_db
import datetime
from fastapi.staticfiles import StaticFiles

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="DopaNotes API")

def calculate_streak(habit, today=None):
    today = today or datetime.date.today()
    if habit.last_check is None:
        return 0
    days = (today - habit.last_check.date()).days
    return habit.streak if days <= 1 else 0


def is_done_today(habit, today=None):
    today = today or datetime.date.today()
    return habit.last_check is not None and habit.last_check.date() == today

@app.get("/health")
def read_root():
    return {"message": "Welcome to the DopaNotes backend!"}

@app.post("/tasks/")
def create_task(task: schemas.taskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(title=task.title, description=task.description)

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@app.get("/tasks/")
def read_tasks(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()
    return tasks

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task_updated: schemas.taskUpdate, db: Session = Depends(get_db)):
    task_found = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task_found == None:
        raise HTTPException(status_code=404, detail="Task not found!")
    else:
        if not task_updated.title == None:
            task_found.title = task_updated.title
        if not task_updated.description == None:
            task_found.description = task_updated.description
        if not task_updated.is_completed == None:
            task_found.is_completed = task_updated.is_completed
        db.commit()
        db.refresh(task_found)
        return task_found

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task_found = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task_found == None:
        raise HTTPException(status_code=404, detail="Task not found!")
    else:
        db.delete(task_found)
        db.commit()

        return {"message": "Task deleted with success!"}

@app.post("/habits/")
def create_habit(habit: schemas.habitCreate, db: Session = Depends(get_db)):
    new_habit = models.Habit(title=habit.title)

    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    return new_habit

@app.get("/habits/")
def read_habits(db: Session = Depends(get_db)):
    habits = db.query(models.Habit).all()
    return [
        {
            "id": h.id,
            "title": h.title,
            "streak": calculate_streak(h),
            "done_today": is_done_today(h),
            "last_check": h.last_check,
        }
        for h in habits
    ]

@app.put("/habits/{habit_id}")
def update_habit(habit_id: int, habit_updated: schemas.habitUpdate, db: Session = Depends(get_db)):
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    now = datetime.datetime.now()

    if habit_updated.title is not None:
        habit.title = habit_updated.title

    # mark
    if habit_updated.is_completed is True and not is_done_today(habit):
        habit.streak = calculate_streak(habit) + 1
        habit.last_check = now

    # unmark (only makes sense if it was marked today)
    elif habit_updated.is_completed is False and is_done_today(habit):
        habit.streak = max(habit.streak - 1, 0)
        habit.last_check = now - datetime.timedelta(days=1) if habit.streak > 0 else None

    db.commit()
    db.refresh(habit)
    return habit

@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: int, db: Session = Depends(get_db)):
    habit_found = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if habit_found == None:
        raise HTTPException(status_code=404, detail="Habit not found!")
    else:
        db.delete(habit_found)
        db.commit()

        return {"message": "Habit deleted with success!"}

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

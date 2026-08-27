<h1 align="center">
  🧠 DopaNotes
</h1>

<p align="center">
  <em>A task, habit and note manager built for easily distracted brains.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/SQLAlchemy-ORM-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white" alt="SQLAlchemy"/>
  <img src="https://img.shields.io/badge/JavaScript-Frontend-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/gilas-byte/DopaNotes?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/gilas-byte/DopaNotes?style=flat-square" alt="Last Commit"/>
</p>

---

## What is DopaNotes?

DopaNotes is a personal productivity tool designed with ADHD in mind. It combines **task management**, **habit tracking**, and **note-taking** into a single, focused interface — because switching between five different apps is exactly the kind of friction that kills your focus.

Built with a lightweight FastAPI backend and a plain JavaScript frontend, it runs fully containerized via Docker so setup is painless and you can focus on what matters: actually getting things done.

---

## ✨ Features

- 📝 **Notes** — Quick capture for thoughts before they vanish
- ✅ **Tasks** — Simple to-do management without the bloat
- 🔁 **Habits** — Track recurring behaviors and build streaks
- ⚡ **Fast API** — RESTful backend with automatic docs at `/docs`
- 🐳 **Docker-first** — One command to spin everything up
- 🔒 **Environment-based config** — No secrets hardcoded, ever

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | [FastAPI](https://fastapi.tiangolo.com/) + [Uvicorn](https://www.uvicorn.org/) |
| Database   | [PostgreSQL 15](https://www.postgresql.org/) |
| ORM        | [SQLAlchemy](https://www.sqlalchemy.org/) |
| Frontend   | Vanilla JavaScript                  |
| Container  | [Docker](https://www.docker.com/) + Docker Compose |

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Git](https://git-scm.com/)

That's it. You don't even need Python installed locally.

---

### 1. Clone the repository

```bash
git clone https://github.com/gilas-byte/DopaNotes.git
cd DopaNotes
```

### 2. Configure your environment

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=dopanotes
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

### 3. Start the containers

```bash
docker-compose up --build
```

This will start:
- **PostgreSQL 15** on port `5433`
- **FastAPI backend** on port `8000`

### 4. Access the app

| Service          | URL                              |
|------------------|----------------------------------|
| Frontend         | [http://localhost:8000](http://localhost:8000) |
| API Docs (Swagger) | [http://localhost:8000/docs](http://localhost:8000/docs) |
| ReDoc            | [http://localhost:8000/redoc](http://localhost:8000/redoc) |

---

## 📁 Project Structure

```
DopaNotes/
├── backend/            # FastAPI application
│   ├── main.py         # App entrypoint and route registration
│   ├── models/         # SQLAlchemy database models
│   ├── schemas/        # Pydantic request/response schemas
│   ├── routers/        # API route handlers
│   └── database.py     # DB connection and session management
├── frontend/           # JavaScript frontend
│   ├── index.html
│   ├── app.js
│   └── style.css
├── .env.example        # Environment variable template
├── docker-compose.yml  # Multi-container Docker setup
├── Dockerfile          # Backend container definition
└── requirements.txt    # Python dependencies
```

---

## 🧪 Development Tips

To run only the database (useful when developing locally without Docker for the backend):

```bash
docker-compose up db
```

To check logs:

```bash
docker-compose logs -f backend
```

To stop everything:

```bash
docker-compose down
```

To reset the database volume (⚠️ deletes all data):

```bash
docker-compose down -v
```

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  Built with ☕ and a lot of tab-switching by <a href="https://github.com/gilas-byte">@gilas-byte</a>
</p>

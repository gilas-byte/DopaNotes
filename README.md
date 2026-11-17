# DopaNotes

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE.txt) ![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow)

DopaNotes is a personal productivity tool designed with ADHD in mind, combining task management and habit tracking in a single interface.
It uses a FastAPI backend, a plain JavaScript frontend, and PostgreSQL, with a Docker Compose setup.

## Features

- **Tasks** — Create, list, complete, and delete tasks through the interface; update titles and descriptions through the API.
- **Habits** — Create, list, complete, and delete habits, with daily completion and streak tracking.
- **API** — RESTful backend with automatic documentation at `/docs` and `/redoc`, plus a `/health` endpoint.
- **Docker Compose** — Run the backend and database together, with configuration supplied through environment variables.

### Limitations

- Notes and projects currently have placeholder pages; there are no API endpoints or database models for storing them.
- The displayed habit streak does not refresh after toggling completion; reload the page to see the saved value.
- Authentication and per-user data isolation are not implemented. The Compose file publishes the API and database ports on all host interfaces; use it in a trusted development environment.
- The frontend loads Tailwind CSS and Phosphor icons from external CDNs, so it is not fully offline.

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Python 3.11 container with [FastAPI](https://fastapi.tiangolo.com/) + [Uvicorn](https://www.uvicorn.org/) |
| Database   | [PostgreSQL 15](https://www.postgresql.org/) |
| ORM        | [SQLAlchemy](https://www.sqlalchemy.org/) |
| Frontend   | Vanilla JavaScript                  |
| Container  | [Docker](https://www.docker.com/) + Docker Compose |

Python dependencies are pinned in [`requirements.txt`](requirements.txt).

## Project Structure

```text
DopaNotes/
├── backend/            # FastAPI application
│   ├── main.py         # API routes, table creation, and static frontend mounting
│   ├── models.py       # SQLAlchemy user, task, and habit models
│   ├── schemas.py      # Pydantic request schemas
│   └── database.py     # Database connection and session management
├── frontend/           # HTML pages, including notes and projects placeholders
│   ├── index.html      # Dashboard
│   ├── tasks.html      # Task management
│   ├── habits.html     # Habit tracking
│   ├── js/             # Page scripts, API calls, modals, and translations
│   └── css/            # Animations
├── .env.example        # PostgreSQL environment variable template
├── docker-compose.yml  # Backend and database services, with the pgdata volume
├── Dockerfile          # Python 3.11 backend container
├── requirements.txt    # Pinned Python dependencies
└── LICENSE.txt         # MIT license
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Git](https://git-scm.com/)

Python does not need to be installed locally when using Docker.

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

Do not commit your `.env` file; it is already in `.gitignore`. Compose uses these values to configure PostgreSQL and set the backend's `DATABASE_URL`.

### 3. Start the containers

```bash
docker compose up --build
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

### Development Tips

To run only the database (useful when developing locally without Docker for the backend):

```bash
docker compose up db
```

When running the backend outside Compose, `backend/database.py` requires `DATABASE_URL` in the process environment; it does not load `.env` itself. The PostgreSQL host port is `5433` (the backend container uses `db:5432`).

To check logs:

```bash
docker compose logs -f backend
```

To stop everything:

```bash
docker compose down
```

To reset the database volume (**deletes all database data**):

```bash
docker compose down -v
```

## Status

Study project — task and habit management are implemented; notes and projects remain incomplete.

## License

This project is open source under the [MIT License](LICENSE.txt).

Created by [Guilherme Anselmo (@gilas-byte)](https://github.com/gilas-byte).

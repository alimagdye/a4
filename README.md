# Task API

A simple CRUD API built with Express.js and TypeScript. Tasks are stored in memory.

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

The server runs at:

```
http://localhost:3000
```

Swagger UI:

```
http://localhost:3000/docs
```

## Endpoints

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /          | API information |
| GET    | /health    | Health check    |
| GET    | /tasks     | Get all tasks   |
| GET    | /tasks/:id | Get task by ID  |
| POST   | /tasks     | Create task     |
| PUT    | /tasks/:id | Update task     |
| DELETE | /tasks/:id | Delete task     |

## Example

```bash
curl -i http://localhost:3000/tasks
```

## Swagger

See `/docs` for interactive API documentation.

![Swagger UI](image.png)

## Postgres docker

```
docker run --name taskdb \
  -e POSTGRES_PASSWORD=dev \
  -e POSTGRES_DB=tasks \
  -p 5432:5432 \
  -v taskdata:/var/lib/postgresql/data \
  -d postgres:17
```

means:

```
docker run
   │
   ├── name → taskdb
   ├── password → dev
   ├── database name → tasks
   ├── port → 5432
   ├── volume → taskdata (data presistance)
   ├── background → yes
   └── image → postgres (download it if not exist)
```

and

```
docker start taskdb
```

means:

start taskdb container

and

```
docker exec -it taskdb psql -U postgres -d tasks
```

means:

Open an interactive PostgreSQL terminal inside the taskdb Docker container, logged in as the postgres user, connected to the tasks database.

then:

```
SELECT * FROM tasks;
```

### Screenshot
![Container Volume](container-volume.png)

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker
- Docker Compose

## Running the Project

```bash
docker compose up --build
```

# Database schema

This directory holds the starter schema for the PostgREST sidecar added by PGA-77.

`schema.sql` is illustrative — replace its contents with your real schema after provisioning.

## How it works

The platform provisions an `app_<slug>` PostgreSQL database and a `<slug>_user` role per app. PostgREST runs as a sidecar in the same ECS task and exposes the `public` schema as a REST API at `/api/*`.

## Local development

Run Postgres and PostgREST locally with Docker Compose:

```sh
docker compose up
```

Then start the app (in a separate terminal):

```sh
POSTGREST_URL=http://localhost:3000 uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

The app proxies `/<slug>-<env>/api/*` → `http://localhost:3000/*` so frontend fetch calls work without CORS configuration.

JWT auth is disabled in the local Compose setup (`PGRST_JWT_SECRET=disabled`). In ECS, PostgREST validates Entra ID JWTs via the secret injected from Secrets Manager.

## Row-level security

The platform creates the `anon` role with read-only grants. Define your own RLS policies to control which rows each authenticated user can see.

# syntax=docker/dockerfile:1

# ---- frontend build stage ----
# Builds the React app. WORKDIR is /repo/frontend so that vite.config.ts's
# outDir: '../app/static' resolves to /repo/app/static — matching where the
# runtime stage expects to find the compiled assets.
FROM node:20-slim AS frontend-builder

WORKDIR /repo/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# ---- python deps stage ----
FROM python:3.12-slim AS python-builder

WORKDIR /build

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ---- runtime stage ----
FROM python:3.12-slim AS runtime

RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# Python packages from builder
COPY --from=python-builder /install /usr/local

# Application source
COPY app/ ./app/

# React build output. In provisioned apps APP_SLUG and APP_ENV are injected as
# ECS task environment variables — the FastAPI app reads them and injects them
# into index.html so each app shows its own slug and env in the React frontend.
COPY --from=frontend-builder /repo/app/static ./app/static

USER appuser

EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]

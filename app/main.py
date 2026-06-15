import os

from fastapi import FastAPI

app = FastAPI()

APP_SLUG = os.environ.get("APP_SLUG", "app")
APP_ENV = os.environ.get("APP_ENV", "dev")


@app.get("/")
def root():
    return {"message": f"Hello from {APP_SLUG}!", "env": APP_ENV}


@app.get("/health")
def health():
    return {"status": "ok"}

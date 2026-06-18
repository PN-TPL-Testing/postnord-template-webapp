from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

# Routes are prefixed with /{APP_SLUG}-{APP_ENV}; defaults are "app" and "dev"
HEALTH = "/app-dev/health"
ROOT = "/app-dev/"


def test_health_returns_ok():
    response = client.get(HEALTH)
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_root_returns_html():
    response = client.get(ROOT)
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_root_contains_slug_and_env():
    response = client.get(ROOT)
    body = response.text
    assert "app" in body
    assert "dev" in body


def test_unknown_route_returns_404():
    response = client.get("/does-not-exist")
    assert response.status_code == 404

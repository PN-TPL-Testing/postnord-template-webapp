import os
from pathlib import Path

import httpx
from fastapi import FastAPI, APIRouter, Request
from fastapi.responses import HTMLResponse, Response
from fastapi.staticfiles import StaticFiles

APP_SLUG = os.environ.get("APP_SLUG", "app")
APP_ENV = os.environ.get("APP_ENV", "dev")
POSTGREST_URL = os.environ.get("POSTGREST_URL", "http://localhost:3000")
PREFIX = f"/{APP_SLUG}-{APP_ENV}"
ENTRA_CLIENT_ID = os.environ.get("ENTRA_CLIENT_ID", "")
ENTRA_TENANT_ID = os.environ.get("ENTRA_TENANT_ID", "")

# Static files are the compiled React build (frontend/). In the Docker image the
# Dockerfile copies the Vite output here. Locally, run `cd frontend && npm run build`
# to populate this directory. The Python tests run without a build present — the
# app falls back to a minimal HTML page in that case.
STATIC_DIR = Path(__file__).parent / "static"

app = FastAPI()
router = APIRouter(prefix=PREFIX)

# Inject runtime config into index.html once at startup. APP_SLUG and APP_ENV are
# set by the ECS task definition for each provisioned app — see the portal's
# ecs_backend.py. In this template they default to "app" / "dev" so local
# development works without setting env vars.
_CONFIG_SCRIPT = (
    "<script>"
    f'window.__APP_CONFIG__={{slug:"{APP_SLUG}",env:"{APP_ENV}",prefix:"{PREFIX}"'
    f',entraClientId:"{ENTRA_CLIENT_ID}",entraTenantId:"{ENTRA_TENANT_ID}"}};'
    "</script>"
)


def _build_spa_html() -> str:
    index_path = STATIC_DIR / "index.html"
    if not index_path.exists():
        # Fallback served when the React build is absent (e.g. running pytest
        # without having run `npm run build` first). The slug and env are
        # included so existing tests that assert on those strings still pass.
        return (
            '<!DOCTYPE html><html lang="en"><head>'
            f"<title>{APP_SLUG}</title></head><body>"
            f"<p>App: {APP_SLUG} | Env: {APP_ENV}</p>"
            "<p>Frontend not built — run: cd frontend &amp;&amp; npm run build</p>"
            "</body></html>"
        )
    html = index_path.read_text()
    # Inject the config script so React can read window.__APP_CONFIG__ at runtime.
    return html.replace("</head>", f"{_CONFIG_SCRIPT}</head>", 1)


# Cache the injected HTML — config is fixed for the lifetime of this container.
_SPA_HTML: str = _build_spa_html()


@router.get("/health")
def health():
    return {"status": "ok"}


_PROXY_SKIP_HEADERS = frozenset({"host", "content-length", "transfer-encoding"})


@router.api_route(
    "/api/{path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
)
async def postgrest_proxy(path: str, request: Request) -> Response:
    """Reverse-proxy /api/* to the PostgREST sidecar (localhost:3000 in ECS)."""
    headers = {
        k: v for k, v in request.headers.items() if k.lower() not in _PROXY_SKIP_HEADERS
    }
    async with httpx.AsyncClient() as client:
        upstream = await client.request(
            method=request.method,
            url=f"{POSTGREST_URL}/{path}",
            params=request.query_params,
            headers=headers,
            content=await request.body(),
        )
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=dict(upstream.headers),
    )


# Catch-all: serve the React SPA for every route under the prefix.
# React Router (with basename=PREFIX) handles client-side navigation from here.
@router.get("/")
@router.get("/{path:path}")
def spa(path: str = ""):
    return HTMLResponse(_SPA_HTML)


# Serve compiled JS/CSS bundles. Only mounted when the build is present so the
# app starts cleanly in test environments too.
if (STATIC_DIR / "assets").exists():
    app.mount(
        f"{PREFIX}/assets",
        StaticFiles(directory=str(STATIC_DIR / "assets")),
        name="static",
    )

app.include_router(router)

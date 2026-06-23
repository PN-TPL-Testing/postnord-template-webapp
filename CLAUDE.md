# PostNord Template Webapp

## Purpose

This repository is the **source template** for PostNord platform apps. It is not deployed directly — when a developer submits a new app slug through the portal UI, the portal clones this repo, replaces `{{...}}` placeholder tokens in the workflow files, and wires up the full AWS infrastructure. The result is a standalone GitHub repo ready to build and deploy.

**Portal repository:** [`TIQQE/postnord-tpl-app-portal`](https://github.com/TIQQE/postnord-tpl-app-portal)

## How provisioning works

The portal runs an 11-step pipeline when a new app is created:

| Step | What it creates |
|------|-----------------|
| 1 | GitHub repo cloned from this template, `{{TOKEN}}` placeholders replaced in workflow files |
| 2 | ECR container registry (`app-<slug>`) |
| 3 | Secrets Manager paths (`/apps/<slug>/{dev,tst,prd}/config`) |
| 4 | CloudWatch log group (`/apps/<slug>`) |
| 5–6 | IAM task roles and OIDC GitHub deploy role (`app-<slug>-github-deploy`) |
| 7 | ECS task definitions for dev/tst/prd (256 CPU / 512 MB) |
| 8 | ECS services, ALB routing rules, Route 53 CNAMEs |
| 9 | Repository collaborator access (currently skipped — not enabled in this environment) |
| 10 | Triggers the first CI build on the provisioned repo |
| 11 | Waits for the app to go live at `http://postnord-tpl-alb-1832331524.eu-north-1.elb.amazonaws.com/<slug>-dev/` |

All provisioning logic lives in `portal/app/provisioning/ecs_backend.py` in the portal repo.

## Platform conventions

These constraints originate from the platform. Changes that break them will break provisioned apps.

- **Port 8080**: ECS task definitions and ALB health checks are hardcoded to port 8080. The app must listen on this port.
- **`/<slug>-<env>/health` route**: The ALB target group health checks `GET /<slug>-<env>/health`. It must return HTTP 200. The route is registered under the `PREFIX` router in `main.py` — do not change the path or remove the route.
- **Environment names**: `dev`, `tst`, `prd` — these appear in ECS service names, Secrets Manager paths, and DNS records. Do not add or rename environments.
- **`{{...}}` tokens**: `.github/workflows/ci.yml`, `deploy.yml`, and `promote.yml` contain tokens such as `{{GITHUB_DEPLOY_ROLE_ARN}}`, `{{AWS_REGION}}`, `{{ECR_REPO_URI}}`, `{{ECS_CLUSTER}}`, and `{{ECS_SERVICE_DEV}}`. **Do not remove or rename these** — the portal replaces them at provision time.
- **`APP_SLUG` and `APP_ENV` env vars**: Used by the portal to inject the app's identity at runtime. Keep these variable names.
- **Secrets**: Runtime secrets live in Secrets Manager at `/apps/<slug>/<env>/config`. The ECS task role for each environment has read-only access to its own path only.
- **IAM boundary**: All task roles operate under a permissions boundary. Do not assume broader AWS access.

## What you can safely change

- Application logic (`app/main.py`), additional routes, new Python dependencies (`requirements.txt`)
- Frontend code (`frontend/`) — React components, routes, styles, npm dependencies (`package.json`). The Dockerfile's `frontend-builder` stage (node:20-slim) compiles the Vite app into `app/static/` at image build time.
- The `Dockerfile`, as long as the image exposes port 8080 and runs as a non-root user
- Additional environment variables read at runtime — document them in the README. The platform-managed vars are `APP_SLUG`, `APP_ENV`, and `APP_PORT`. App-level vars currently used: `ENTRA_CLIENT_ID` and `ENTRA_TENANT_ID` (Azure AD / MSAL auth, injected from Secrets Manager).

## CI in this repo

The workflows `ci.yml`, `deploy.yml`, and `promote.yml` are **templates for provisioned apps** — they contain unresolved `{{...}}` tokens and are not meant to run here directly.

`validate.yml` is specific to this template repo. It:
- Builds the Docker image on every PR to `main` (validates the template is buildable)
- On merge to `main`, fires a `repository_dispatch` event to `TIQQE/postnord-tpl-app-portal` so the portal can react to template changes

The dispatch requires a secret `PORTAL_DISPATCH_PAT` — a classic GitHub PAT with `repo` scope on the portal repo, stored in this repo's secrets by someone who is a member of both `PN-TPL-Testing` and `TIQQE`.

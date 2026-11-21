# Deploying to Render

The whole site is static files — no build, no server. Render's free
static-site plan is enough.

## From the Render dashboard (2 minutes)

1. Push this repo to GitHub (done already if you're reading this there).
2. On [render.com](https://render.com): **New → Blueprint**, pick this repo.
   The `render.yaml` in the root does the rest.
3. Render gives you a URL like `keralam-eat.onrender.com` — live immediately.

## Attach keralam.eat

1. In the service: **Settings → Custom Domains → Add** `keralam.eat`.
2. Render shows you a CNAME (or A records). Put those into your domain
   registrar's DNS for `keralam.eat`.
3. Render issues the TLS certificate automatically within a few minutes —
   mandatory anyway, since `.eat` is on the HSTS preload list and browsers
   refuse plain HTTP on it.

## After the first deploy

Every `git push` to the connected branch redeploys automatically.
To add or change kitchens: edit `data.js`, commit, push — done.

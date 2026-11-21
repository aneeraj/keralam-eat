# Deploying to Render — via the CLI

The site is deployed with the Render CLI. Repo: `github.com/aneeraj/keralam-eat`,
service: `keralam-eat` (static site, free).

## Day-to-day

Every `git push` to `main` redeploys automatically. Nothing else to do.

```sh
# see deploys
render deploys list keralam-eat

# trigger one by hand
render deploys create keralam-eat --confirm
```

## From scratch (if ever needed)

```sh
brew install render
render login                    # browser → "Authorize CLI"
render blueprints validate      # checks render.yaml
render services create \
  --name keralam-eat \
  --type static_site \
  --repo https://github.com/aneeraj/keralam-eat \
  --branch main \
  --publish-directory . \
  --auto-deploy \
  --output json --confirm
```

Note: Render must be able to fetch the repo, so it stays public —
which suits this project anyway.

## Attach keralam.eat (one-time, dashboard)

1. In Render: the service → **Settings → Custom Domains → Add** `keralam.eat`.
2. Render shows a CNAME (or A records) — paste those at the domain registrar.
3. Render issues TLS automatically. Mandatory regardless: `.eat` is on the
   HSTS preload list, so browsers refuse plain HTTP on it.

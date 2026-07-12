# fazleras.github.io

Personal portfolio site — plain HTML, CSS, and a few lines of JS. No build
step, no dependencies.

- `index.html` — all content
- `styles.css` — design tokens (light/dark via CSS variables) + layout
- `script.js` — theme toggle (persisted in localStorage) + footer year

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
```

## Deploy

Hosted on GitHub Pages from the `main` branch of this repo
(Settings → Pages → Deploy from branch → `main` / root).

# fazleras.github.io

Personal portfolio site built with HTML, CSS, and JS

- `index.html`: all content
- `styles.css`: design tokens (light/dark via CSS variables), layout, print rules
- `script.js`: theme toggle (persisted in localStorage), section reveal on
  scroll, hero parallax, footer year
- `assets/shots/`: project screenshots, captured from the live apps at 960px wide
- `assets/hero-bg.svg`: hero background, sits under a per-theme scrim

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
```

## Deploy

Hosted on GitHub Pages from the `main` branch of this repo
(Settings -> Pages -> Deploy from branch -> `main` / root).

alternatively, just visit https://fazleras.github.io/

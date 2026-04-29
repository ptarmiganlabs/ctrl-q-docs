# Ctrl-Q documentation site

This repository contains the [VitePress](https://vitepress.dev/) documentation site for [Ctrl-Q](https://github.com/ptarmiganlabs/ctrl-q).

The documentation site is published at [https://ctrl-q.ptarmiganlabs.com](https://ctrl-q.ptarmiganlabs.com).

## Development

```bash
npm install
npm run dev
```

The development server starts at <http://localhost:5173>.

## Build

```bash
npm run build
npm run serve
```

The production build is written to `docs/.vitepress/dist`.

## Structure

```text
docs/
├── index.md          # Home page
├── docs/             # Documentation content
├── public/           # Static assets served from /
└── .vitepress/       # VitePress config and theme
```

The old Hugo/Docsy site source is kept in `hugo-archive/` for reference.

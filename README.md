# Phlox Studio — Photography & Film

A modern, responsive, and framework-free photography and cinematography portfolio website inspired by Phlox Studio. Built with clean semantic HTML5, modern CSS3, and vanilla JavaScript.

---

## ✨ Features

- **Hero Carousel**:
  - Interactive multi-slide photography showcase with smooth crossfade transitions.
  - Autoplay with play/pause controls, slide counter indicator, and drag/keyboard swipe navigation.
- **Mobile-First Responsive Navigation**:
  - Full-screen animated mobile menu drawer with smooth transitions.
  - Scroll-locking on body/html and keyboard (`Escape`) accessibility.
  - Isolated stacking context preventing header `backdrop-filter` clipping.
- **Featured Shots Showcase**:
  - Interactive carousel slider showcasing editorial and portrait photography.
- **Interactive Portfolio Gallery**:
  - Dynamic category-based filtering (*Advertising, Fashion, Freestyle, Kids, Nature, Sports, Wedding*).
  - Smooth entrance animations and responsive masonry grid layout.
- **Cinematic Video Showreel Modal**:
  - Accessible HTML5 `<dialog>` modal for showcasing studio films and reels.
- **Studio Magazine & Newsletter**:
  - Interactive email subscription form with live client-side feedback.
- **Dark Aesthetic & Typography**:
  - Premium dark luxury palette with gold accents (`#c8953e`).
  - Google Fonts: *Playfair Display* (display serif) and *Manrope* (clean sans-serif).
- **Accessibility & Performance**:
  - Semantic HTML landmarks (`<header>`, `<main>`, `<section>`, `<dialog>`, `<footer>`).
  - Screen reader accessible ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`, `aria-live`).
  - Respects `prefers-reduced-motion` media queries.

---

## 📁 Project Structure

```text
DipeshDaaWebsite/
├── assets/                  # Studio photography, vector graphics, and icons
├── index.html               # Main semantic HTML5 document
├── styles.css               # Modern CSS styling (custom properties, fluid clamp typography, grid/flexbox)
├── script.js                # Vanilla JavaScript interactions, carousels, modal, and filtering
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

No build tools or package managers required. You can serve the static files with any local web server.

### Option 1: Python HTTP Server

```bash
# Python 3
python -m http.server 8765
```

Then visit [http://localhost:8765](http://localhost:8765) in your browser.

### Option 2: Node.js `serve` / `npx`

```bash
npx serve .
```

### Option 3: VS Code Live Server

Open the workspace in VS Code and click **"Go Live"** in the status bar.

---

## 🛠️ Built With

- **HTML5** — Semantic markup, native `<dialog>` element.
- **CSS3** — Custom properties (CSS variables), CSS Grid, Flexbox, fluid `clamp()` sizing, `backdrop-filter`.
- **Vanilla JavaScript (ES6+)** — Intersection Observer API, Web Animations API, Touch & Pointer events.
- **Google Fonts** — *Manrope* & *Playfair Display*.

---

## 📄 License

This project is created for demonstration and portfolio purposes.

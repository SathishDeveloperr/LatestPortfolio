# Sathish Kumar — Developer Portfolio

A single-page portfolio built with **React + Vite + Tailwind CSS + Framer Motion + Lenis** (buttery smooth scrolling), themed around the AI-generated hero video.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & deploy (Vercel)

```bash
npm run build      # outputs to dist/
```

Push this folder to a GitHub repo → import it in Vercel → framework preset **Vite** → deploy. No extra config needed.

## ✏️ Before you publish — 2 quick edits

1. **`src/data/profile.js`** → replace the placeholder GitHub / LinkedIn URLs with your real ones.
2. **`src/components/Projects.jsx`** → the "More shipping soon" card links to your GitHub — it uses the same placeholder.

## 🎬 The Guided Tour page (`/projects`)

Full-screen showcase where your avatar presents each project (video on alternating
sides, project preview beside it). Visitors click play (sound on), and when the
8-second clip ends the page glides to the next project automatically.

To add a video for a project:

1. Save it as `public/videos/<slug>.mp4` (720p, 16:9, 8 sec)
2. Optional but recommended: `<slug>-poster.jpg` (first frame) and `<slug>.webm`
   ```bash
   ffmpeg -i in.mp4 -vframes 1 -q:v 4 public/videos/<slug>-poster.jpg
   ffmpeg -i in.mp4 -c:v libvpx-vp9 -crf 36 -b:v 0 -c:a libopus public/videos/<slug>.webm
   ```
3. In `src/data/projects.js` set `video`, `videoPoster`, and `videoSide`
   (`'left'`/`'right'` — pick the side so the character stands next to the project panel).

Projects without a video show their poster with a "coming soon" chip — still
waiting on: SOLARIS, VANTA, AURUM & NOIR.

## ➕ Adding a new project (you'll be at 15+ soon)

Everything is data-driven — **you never need to touch component code**:

1. Add a cover image to `public/projects/` (1280×800 recommended).
   - Best: a real screenshot of the app (press F12 → Ctrl+Shift+P → "Capture screenshot" in Chrome for a clean one).
2. Open `src/data/projects.js`, copy any project object, fill in your details, and place it in the array (first item = first in the grid; set `featured: true` on one project to give it the wide card).
3. `category` must be `'ai'`, `'immersive'` or `'product'` — or add a new one to the `CATEGORIES` list at the top of the same file and it automatically becomes a filter tab.

The filter counts, tabs and grid all update automatically.

## Other things you can edit without touching components

| What                     | Where                     |
| ------------------------ | ------------------------- |
| Name, tagline, contact   | `src/data/profile.js`     |
| Rotating hero roles      | `src/data/profile.js`     |
| Stats (years, projects)  | `src/data/profile.js`     |
| Skills & marquee strip   | `src/data/skills.js`      |
| Work experience timeline | `src/data/experience.js`  |
| Resume PDF               | `public/Sathish_Kumar_Resume.pdf` (replace the file) |
| Hero video               | `public/hero-video.mp4` + `hero-video.webm` + `hero-poster.jpg` |

## Hero video tips

- The video autoplays **muted** (browsers require this). Visitors can unmute with the speaker button — your spoken intro plays.
- If you regenerate the video, also regenerate the WebM + poster for fast loading:
  ```bash
  ffmpeg -i hero-video.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -an hero-video.webm
  ffmpeg -i hero-video.mp4 -vframes 1 -q:v 3 hero-poster.jpg
  ```
- Keep the video's background red similar to the current one — the page colors (`brick` in `tailwind.config.js`) were sampled from it so it blends seamlessly.

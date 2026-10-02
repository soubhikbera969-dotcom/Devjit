# 👑 Happy Birthday Dev | Premium Scroll Experience

A cinematic, handcrafted, scroll-driven storytelling birthday website created for **Devjit Rath ("Dev")** turning 19.

Built with **React 19, Vite, TypeScript, Tailwind CSS, GSAP (ScrollTrigger), Lenis Smooth Scroll, and Canvas Confetti**.

---

## 🚀 Quick Start (Install & Run)

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🎨 How to Customize

### 1. Swapping Text & Personal Details
All copy, jokes, milestones, traits, cricket stats, and personal letters are centralized in a single file:
👉 **`src/data/content.ts`**

In that file, you can easily change:
- `person`: Name, Nickname, Turning Age, Birthday date.
- `countdown`: Target date and timezone (`Asia/Kolkata`). Auto-rolls to the next October 5 once passed.
- `hero`: Headlines, subtitles, badges.
- `quote`: Word-by-word scrubbed roast & heartfelt toast.
- `celebrator`: Hobbies, traits (jokes & truths), and running joke badge.
- `photoNotes`: Photographic memory cards featuring real photos, locations, dates, heartfelt handwritten sweet notes from Soubhik, and affectionate roasts.
- `manOfTheMatch`: Award title, cricket stats, and custom quote.
- `gallery`: Captions, photo names, and rotation degrees.
- `wishes`: 01 Health, 02 Career, 03 Happiness cards.
- `finalNote`: Soubhik's personal letter and roast sign-off.

---

### 2. Swapping Images
All photos reside in the `public/images/` directory:
- `hero.jpg`: Hero portrait of Dev.
- `about.jpg`: Profile shot for the Celebrator section.
- `gallery-1.jpg` to `gallery-8.jpg`: Photos for the Moments Gallery & Lightbox.
- `final.jpg`: Backdrop photo for the closing thank-you section.

> **Zero Broken Images Guarantee**: If any image file is missing or fails to load, the site automatically displays a stylish navy/yellow gradient placeholder with glowing badge rather than showing a broken image.

---

### 3. Modifying Theme Colors
The design system colors are declared in `tailwind.config.js` and `src/index.css`:
- `--navy-900: #0A1A3A` (Primary background)
- `--navy-700: #14305F` (Cards & containers)
- `--navy-500: #1E4A8C` (Borders & accents)
- `--yellow-400: #FFC83D` (Primary golden accent & buttons)
- `--yellow-300: #FFD966` (Highlights)
- `--amber-500: #F5A100` (Glows & roast highlights)
- `--cream: #FFF8E7` (Text & light elements)

---

## ⚡ Interactive Features & Easter Eggs
- **Lenis Smooth Scroll**: Silky 60fps scrolling coupled with GSAP ScrollTrigger.
- **Clickable Balloons**: Click any balloon on the screen to pop it with a confetti explosion and pop sound!
- **Interactive Trophy**: Click the Man of the Match golden trophy for celebration fireworks.
- **Live IST Countdown**: Live days/hours/minutes/seconds countdown to 5 October 00:00 IST. On 5 October, it triggers an "It's your day, Dev!" celebration banner.
- **Cinema Lightbox**: Click any gallery photo to open a fullscreen lightbox with keyboard navigation (`←`, `→`, `Esc`).
- **Secret Easter Egg**: Press **`B`** or type **`dev`** anywhere on the keyboard to trigger an avalanche of celebratory confetti rain!
- **Replay Button**: Scrolls smoothly back to the top and refires the celebration fireworks.

---

Made with ❤️ by Soubhik for Devjit Rath's 19th Birthday.

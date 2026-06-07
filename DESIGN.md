# DESIGN.md - jacobchesslo.com

_Last updated: May 2026_

> _"The rigor of science meets the messiness of discovery, with the energy of a DJ set."_

---

## 1. Identity & Vision

### Concept

This site lives at the intersection of **Space Age wonder**, **scientific process**, and **underground creative culture**. Think: a researcher who also DJs. A blueprint that's also a mood board. Data that pulses.

The design should feel like stumbling into a lab where the walls are covered in pinned notes, orbital diagrams, and spectrogram printouts - but the lights are low, the music is on, and something is about to launch.

### Core Tension (lean into it)

- **Rigorous ↔ Expressive** - precision type meets freeform composition
- **Dark & moody ↔ Neon & alive** - near-void black backgrounds with electric purple and fuchsia
- **Scientific method ↔ Creative chaos** - structured grids broken by organic moments
- **Professional ↔ Playful** - portfolio-grade polish with a personality that leaks through

### Identity

- **Name:** Jacob Chesslo
- **Domain:** jacobchesslo.com
- **Logo/Wordmark:** TBD - geometric monogram or glyph recommended; reserve space in nav
- **Tagline direction:** The crossover identity - science + creativity + aerospace

---

## 2. Color System ✦ FINALIZED

### Palette Philosophy

Near-void black as the foundation. Electric violet/purple as the primary identity color. Hot fuchsia as the high-energy secondary. Coral/orange as the quiet functional tertiary - dates, metadata, scaffolding. Acid green used at absolute maximum 1–2 instances per full page scroll - a signal, not a theme.

### Color Tokens

| Token             | Value                  | Role                                             |
| ----------------- | ---------------------- | ------------------------------------------------ |
| `--bg`            | `oklch(3% 0.006 264)`  | Page background - near-void, no blue undertone   |
| `--surface`       | `oklch(5% 0.009 264)`  | Cards, panels, elevated surfaces                 |
| `--surface2`      | `oklch(8% 0.013 268)`  | Hover states, subtle distinction                 |
| `--border`        | `oklch(12% 0.028 282)` | Borders, dividers, grid lines                    |
| `--text`          | `oklch(91% 0.018 295)` | Main body text - slightly warm white             |
| `--text-dim`      | `oklch(58% 0.056 295)` | Secondary text, descriptions                     |
| `--text-muted`    | `oklch(20% 0.038 290)` | Placeholders, disabled, ghost elements           |
| `--accent`        | `oklch(55% 0.22 295)`  | Primary - electric violet/purple                 |
| `--accent-bright` | `oklch(65% 0.17 295)`  | Hover states, highlights                         |
| `--accent-neon`   | `oklch(48% 0.29 300)`  | Max energy - once per page absolute limit        |
| `--secondary`     | `oklch(63% 0.24 340)`  | Fuchsia - key stats, contact glow                |
| `--tertiary`      | `oklch(63% 0.19 35)`   | Coral - dates, metadata, timeline, project links |
| `--green`         | `oklch(92% 0.22 131)`  | Acid green - 1–2 uses per page max, signal only  |

### Color Hierarchy & Usage Rules

**Purple (`--accent`)** - identity. Structure, borders, primary actions, section labels, nav active state, card hover borders, cursor ring.

**Fuchsia (`--secondary`)** - energy. Key achievement numbers in experience, contact tagline glow, edu-card top border on hover.

**Coral (`--tertiary`)** - time. All dates and date ranges, timeline dots, project GitHub links, year labels. Present but not demanding attention.

**Acid Green (`--green`)** - signal. Reserve for 1–2 moments per full scroll. Best candidates: one achievement stat (e.g. "386 days"), one tag on a specific project card, skill chip hover state (reads as "system live"). If debating whether to use it somewhere - don't.

### Additional Rules

- 80% void backgrounds - the darkness is the design
- Never use pure `#000000` or `#ffffff` - always tinted
- Glows allowed on `--accent`, `--secondary`, and as ambient halo on cards/buttons - never `--tertiary` or `--green`
- Noise grain overlay: SVG turbulence at ~4% opacity, fixed, full page
- Nebula halos: 4 blobs total - purple top-right (opacity ≤ 8%), fuchsia bottom-left bleeding off-screen (opacity ≤ 10%), coral center-left (opacity ≤ 6%), purple far-right (opacity ≤ 5%). All `filter: blur(80px–120px)`. The star field and grain carry the rest of the atmosphere.
- Blueprint grid lines in hero only: 1px at `color-mix(in oklch, var(--accent) 5%, transparent)`, 60px grid

---

## 3. Typography ✦ FINALIZED

### The Stack

| Role                      | Font               | Weight     | Usage                                             |
| ------------------------- | ------------------ | ---------- | ------------------------------------------------- |
| Display / Hero / H1       | **Syne**           | 800        | All big statements, hero name, section watermarks |
| Section Headings / H2–H3  | **Syne**           | 700        | Consistent with display                           |
| Body / Prose              | **Outfit**         | 300–400    | Readable paragraphs, bio, descriptions            |
| Pull quotes / Accent body | **Outfit**         | 400 italic | Sparingly - voice moments in bio                  |
| Monospace / Labels / UI   | **JetBrains Mono** | 400–500    | Nav, tags, dates, metadata, code, section labels  |

### Google Fonts Import

```html
<link
  href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
--font-display: 'Syne', sans-serif;
--font-body: 'Outfit', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Rules

- **No Inter. No Roboto. No system fonts.**
- Hero name: `clamp(3.5rem, 9vw, 8rem)`, weight 800, line-height 0.95, letter-spacing -0.02em
- Section headers: `clamp(2rem, 4vw, 3.2rem)`, weight 700
- Body: `1rem–1.05rem`, weight 300, line-height 1.75–1.8
- Mono labels: `0.65–0.72rem`, letter-spacing `0.16–0.22em`, always uppercase
- Dates and metadata: JetBrains Mono, colored `--tertiary`
- Nav links: JetBrains Mono, `0.72rem`, letter-spacing `0.18em`, uppercase
- Ghost/watermark text: Syne 800, 10–12vw, `-webkit-text-stroke: 1px color-mix(in oklch, var(--accent) 5%, transparent)`, transparent fill

---

## 4. Layout & Spatial Composition

### Grid System

- **12-column grid**, collapsing to 4 on mobile
- **Max content width:** `1200px`, centered
- **Section padding:** vary by section - Hero/About `120px` desktop; dense sections (Skills, Links) `72px`; Contact `160px` for breath. Mobile: `64px` default, `48px` on dense sections.
- Allow intentional grid breaks - pull quotes into gutters, project cards offset by half-column

### Layout Principles

- Asymmetry is intentional - not everything left-aligns
- Generous negative space - the void is part of the palette
- Layering - text over subtle textures, ghost watermarks behind sections
- Rotated text for watermarks (e.g. `PROJECTS` at 90° on left edge)
- Section transitions: full-bleed gradient fades or thin accent rules - never just whitespace

### Page Structure (Single Page + Anchors)

1. **Hero** - Name, tagline, star field, scroll cue
2. **About / Bio** - Split layout, prose, interests, keyword tags
3. **Experience** - Vertical timeline with role cards and highlights
4. **Education** - 3-card grid, degree / GPA / honors
5. **Projects** - Card grid with domain tags and links
6. **Skills** - 6-group chip layout
7. **Links** - Socials, GitHub
8. **Contact** - Tagline + email reveal + link buttons

---

## 5. Visual Language & Texture

### Atmosphere

A researcher's desktop at 2am. Monitor glow. A spectrogram open in one tab, a star map in another. Music low. Work that matters, done with care and a sense of style.

### Techniques

- **Noise/grain overlay** - SVG turbulence at 4% opacity, fixed, full page
- **Radial nebula halos** - 4 blobs: purple top-right, fuchsia bottom-left (bleeding off-screen), coral center-left, purple far-right. `filter: blur(80px–120px)`, opacities 5–10%. Asymmetric placement is intentional.
- **Blueprint grid** - hero section only, faint purple 1px lines at 60px intervals
- **Scanlines** - subtle repeating horizontal gradient on hero (CRT homage)
- **Glassmorphism** - nav overlay and modal-like surfaces only: `backdrop-filter: blur(16px)`, dark bg. Static cards use surface elevation (`--surface` / `--surface2` lightness steps) - no blur.
- **Glow** - `text-shadow` on contact tagline (fuchsia). Neon glow on CTA buttons at rest and on hover. Ambient `box-shadow` glow on card hover (accent-tinted). These are deliberate identity beats, not decoration drift.

### Iconography

- Thin-stroke icons (Phosphor or Lucide), outline only, never filled
- Custom SVG monogram TBD for nav brand mark
- No emoji in UI

### Imagery Style

- Dark, high-contrast, technically interesting: rocket exhaust, circuit boards, star fields, particle tracks, lab equipment
- Stock: desaturate then tint subtly purple
- Project screenshots: dark mockup frames with soft purple glow edge

---

## 6. Motion & Interaction

### Philosophy

Motion feels like a system powering on, not a magic show. One well-orchestrated load sequence beats scattered micro-interactions everywhere.

### Easing Standard

```css
cubic-bezier(0.16, 1, 0.3, 1)  /* expo out */
```

No bounce. No elastic. No overshoot.
Durations: `200ms` micro, `400ms` reveals, `600ms` section transitions.

### Behaviors

**Page load** - Hero assembles with staggered `fadeUp` (tag → name → title → sub → CTAs), delays 200ms–800ms.

**Scroll reveals** - Experience timeline entries only: staggered `fadeUp` as they enter, IntersectionObserver. All other sections are immediately present - no universal scroll-triggered animation.

**Parallax** - Hero star field and grid drift at 5–8% scroll offset. Disable with `prefers-reduced-motion`.

**Nav** - Transparent on load → `backdrop-filter: blur(16px)` + `oklch(3% 0.006 264 / 0.92)` background after 40px scroll.

**Cards** - `translateY(-4px)` on hover, border brightens to `--accent-bright`. No halo glow - the translate is the signal.

**Custom cursor** - Cut. The type and colour palette carry the identity; a custom cursor adds friction for keyboard and touch users.

**Contact email** - Revealed on click to prevent scraper harvesting.

### Hover State Summary

| Element        | Default                   | Hover                                       |
| -------------- | ------------------------- | ------------------------------------------- |
| Nav links      | `--text-dim`              | `--accent-bright`                           |
| Skill chips    | purple tint               | `--green` tint (signal - "system live")     |
| Project cards  | neutral border            | coral bottom hairline + ambient accent glow |
| Primary button | `--accent` bg + neon glow | `--accent-bright` bg + brighter glow        |
| Ghost button   | `--border`                | `--accent` border, `--accent-bright` text   |
| Tags / pills   | purple-tinted             | purple-tinted + bright border               |

---

## 7. Navigation

### Structure

- Fixed top nav, full-width
- Left: `JC.` initials or wordmark (TBD)
- Right: `About · Experience · Education · Projects · Skills · Contact`
- Mobile: hamburger → full-screen overlay, large Syne type

### Typography

- JetBrains Mono, `0.72rem`, `letter-spacing: 0.18em`, uppercase
- Active section: `--accent-bright` with subtle dot or underline indicator

---

## 8. Section Detail Reference

### Hero

Full viewport height, content left-biased. Star field (CSS radial-gradient dots) + 1 asymmetric nebula halo (fuchsia, bottom-left, bleeding off-screen) + blueprint grid + scanlines. Name in Syne 800, solid `--text` - weight and the display face carry the energy. Subtitle in JetBrains Mono. Body line in Outfit 300. Two CTAs. Scroll cue bottom-left.

### About

60/40 split: bio left, interests right. Outfit 300 body, 1.8 line height. One Syne pull-phrase large. JetBrains Mono keyword pills.

### Experience

Vertical timeline, gradient line purple → fuchsia → transparent. Each entry: glowing purple dot node, Syne role title, JetBrains Mono org + date in `--tertiary`. Highlight bullets: 1px left hairline rule in `--border`, brightening to `--accent` on card hover; key stats in `--secondary`. Acid green used once max here - best candidate: "386 days" stat.

### Education

Asymmetric two-row layout: first row 65/35 split (primary degree large left, secondary right), second row 35/65 split (inverted). Coral year, Syne degree, JetBrains Mono school + GPA. `--accent` 1px top-border appears on hover; brightens to `--accent-bright` - no gradient. Cards lift 4px.

### Projects

2–3 column grid. JetBrains Mono domain tag (purple), Syne project name, Outfit description, coral GitHub link (↗). Bottom edge glows coral on hover. One green tag allowed if project warrants.

### Skills

6 groups (Languages, Infrastructure, Science/HPC, Physics, Aerospace, Leadership). JetBrains Mono group headers in `--accent`. Chip hover → `--green` (most recurring green use - reads as "system live").

### Contact

Centered. Syne 800 tagline. Fuchsia + glow on punchline. JetBrains Mono sub-line. 3 ghost link buttons: GitHub, Email, LinkedIn.

---

## 9. Responsive Behavior

| Breakpoint | Width        | Notes                                                        |
| ---------- | ------------ | ------------------------------------------------------------ |
| Mobile     | `< 640px`    | Single column, reduced hero font, no parallax, hamburger nav |
| Tablet     | `640–1024px` | 2-col grids, nav may collapse                                |
| Desktop    | `> 1024px`   | Full layout, parallax active                                 |
| Wide       | `> 1440px`   | Max-width container, bg fills viewport                       |

- `prefers-reduced-motion`: disable parallax + staggered animations, instant transitions
- Dark mode only for now - light mode is a future consideration

---

## 10. Open Questions / TBD

- [ ] Logo / monogram - geometric glyph (triangle + orbit arc?) - design needed
- [ ] Name display in nav: full name vs `JC.` initials
- [ ] Tech stack: **Next.js + Tailwind + Framer Motion** recommended, or pure HTML/CSS/JS
- [ ] About bio draft - first-person, ~80 words
- [ ] Gallery / media section - content and imagery sourcing TBD
- [ ] Resume PDF - should visually match site aesthetic
- [ ] Light mode - future consideration only

---

_This is the living design contract for jacobchesslo.com. Update as decisions solidify. Lock before dev handoff._

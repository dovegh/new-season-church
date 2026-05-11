# New Season Church — Website

A static website for **New Season Church**. Built with vanilla HTML, CSS, and JavaScript — no build step, no framework, no dependencies. Deploys to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static host with zero configuration.

## Design

A cinematic, editorial design language that mixes three references the team loved:

- **Dark + bold typography** (Mission Forward, Culto Jimp)
- **Photo-grid storytelling** (Iglesia Cristiana Tabernaculo)
- **Textured / artistic detail** (Beloved, Guiding Lights)

The accent color is **ember** (`#ff7a3d`) — firelight, dawn, the warmth of a new season — instead of the typical church blue/purple. Typography pairs **Fraunces** (an optical-sized variable serif with editorial italics) with **Geist** (sans) and **Geist Mono** (accent labels).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero (series art + next Sunday), marquee, welcome, ministries, recent messages, CTA |
| `about.html` | Story, values, team, beliefs |
| `ministries.html` | Detail for all six ministries (Kids, Youth, Young Adults, Women, Men, Outreach) |
| `watch.html` | Live player, latest messages, series archive, podcast links |
| `connect.html` | Plan a visit form, location/map, prayer request, give |

## Structure

```
new-season-church/
├── index.html
├── about.html
├── ministries.html
├── watch.html
├── connect.html
├── css/
│   └── styles.css       # Full design system + page styles
├── js/
│   └── main.js          # Nav, scroll behavior, reveal animations, grain
└── images/              # (drop your church photos here — see below)
```

## Photos

The site uses tasteful placeholder slots for every image. To swap in real photos:

1. Drop images into the `images/` folder.
2. Find the relevant `.photo-slot`, `.team-photo`, `.ministry-visual`, or `.series-art` element in the HTML.
3. Replace its placeholder gradient with a real image. For most slots, the cleanest swap is to add a background image inline:

   ```html
   <div class="photo-slot s1" style="background-image: url('images/worship.jpg'); background-size: cover; background-position: center;">
     <!-- remove the inner <span> when swapping -->
   </div>
   ```

   For the hero series art, replace the `.series-art` gradient inside `index.html` the same way.

Recommended sizes:
- Hero series art: **1200×1500** or larger, dark/moody
- Photo grid slots: **800×800** to **1200×900**, varied
- Team photos: **600×750** (4:5)
- Ministry visuals: **800×1000** (4:5)

## Forms

The **Plan a Visit** and **Prayer Request** forms on `connect.html` show a success alert by default. To wire them to real backends without changing the design, you can use any of:

- **[Formspree](https://formspree.io)** — point the `<form action>` at your Formspree endpoint
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — add `data-netlify="true"` to the `<form>` tag
- **[Web3Forms](https://web3forms.com)** — drop in their endpoint
- Your own backend — replace the `onsubmit` handler with a `fetch()` call

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (e.g., `new-season-church`).
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch** → **`main`** → **`/ (root)`**.
4. Save. Your site will be live at `https://<your-username>.github.io/new-season-church/` in about a minute.

For a custom domain (e.g., `newseason.church`), add a `CNAME` file with the domain and configure DNS per [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Local Preview

No build step. Just open `index.html` in your browser. Or run a tiny local server:

```bash
# Python 3
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Editing Content

All copy lives directly in the HTML — search for the phrase you want to change, edit, save, refresh.

Common things to update:
- **Service times** → find `9:00 AM` / `11:00 AM` across files (mostly hero card on `index.html` and `connect.html`)
- **Pastor names** → search for `Pastor Daniel Reyes` in `index.html`, `about.html`, `ministries.html`
- **Address** → `1240 Hope Avenue` on `connect.html`
- **Series name & description** → `Threshold` in the `.series-card` on `index.html`
- **Social links** → footer of every page (`href="#"` placeholders)
- **Email** → `hello@newseason.church` on `connect.html`

## Accessibility

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- All interactive elements are keyboard-focusable
- ARIA labels on icon-only buttons and decorative elements
- Respects `prefers-reduced-motion`
- Color contrast meets WCAG AA on all text

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last two major versions). Uses CSS variables, `backdrop-filter`, CSS Grid, and IntersectionObserver.

---

Built with care for New Season Church.

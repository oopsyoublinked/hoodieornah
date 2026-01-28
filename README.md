# hoodieornah 🧥

Settle the daily hoodie debate in one click.

**hoodieornah** tells you whether today is *hoodie*, *maybe*, or *nah* based on your local weather, adjusted for wind, night time, and how you personally run (cold or warm).

No accounts.  
No tracking.  
Just weather math.

👉 Live site: https://hoodieornah.com

---

## How it works

hoodieornah uses:
- Your GPS (or a manual location)
- Open-Meteo’s free weather API
- A simple adjustment model:
  - Feels-like temperature
  - Wind chill
  - Day vs night
  - Personal temperature preference

### Decision logic (v1)

- **Hoodie**: adjusted temp below 62°F  
- **Maybe**: 62–68°F  
- **Nah**: above 68°F  

Extra logic:
- Wind over 10 mph feels colder
- Night time cools things off
- “I run warm / cold” nudges the result
- “Layer up” appears when it’s hoodie-cold and especially chilly

---

## Sharing

Every result can be shared using a clean preview card.

Example:
```
/share?temp=72&verdict=Nah&place=Sydney
```

- Static Open Graph image for maximum compatibility
- Dynamic preview text (temp, verdict, location)
- Works on Discord, iMessage, Slack, X, and more

---

## Tech stack

- **Frontend**: Plain HTML, CSS, and vanilla JavaScript
- **Weather**: Open-Meteo API (no API key required)
- **Hosting**: Cloudflare Pages
- **Edge Functions**: Cloudflare Pages Functions (`/share`)
- **No frameworks, no build step**

This project is intentionally lightweight.

---

## Project structure

```
/
├── index.html        # The app
├── og.png            # Open Graph preview image
└── functions/
    └── share.js      # Dynamic share metadata
```

---

## Local development

This is a static site.

You can open `index.html` directly in a browser, or use a simple server:

```
python3 -m http.server
```

Note: the `/share` route requires Cloudflare Pages Functions and will not run locally.

---

## Deploying

1. Push this repo to GitHub
2. Create a Cloudflare Pages project
3. Connect the repository
4. Set the build output directory to `/`
5. Deploy
6. (Optional) Attach a custom domain

Cloudflare will automatically detect and deploy the Pages Function.

---

## Privacy

hoodieornah:
- Does not create accounts
- Does not store locations
- Does not track users
- Uses browser-native geolocation only when requested

---

## Why this exists

Because every day someone asks:

> “Is it hoodie weather?”

Now you have an answer.

---

## License

MIT

---

Made for fun. Built to ship.

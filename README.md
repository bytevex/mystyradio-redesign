# mistyradio redesign

dit is een volledig redesign van de [originele mistyradio website](https://mistyradio.org). begonnen als een persoonlijk project om te kijken of ik een betere versie kon maken.

**toestemming:** Bram (een van de founders) heeft me toestemming gegeven om dit te bouwen. check de [discord chat screenshot](image.png) als bewijs nodig is.

**status:** eigen project, niet de officiële mistyradio site. gewoon mijn take op hoe het volgens mij beter zou kunnen.

## wat ik verbeterd heb

vergeleken met de originele site:

- **performance:** vite build system ipv wat ze hadden (sneller laden)
- **modernere ui:** glassmorphism, smooth animaties met framer motion
- **betere mobile support:** werkt nu goed op telefoons
- **sticky audio player:** blijft onderaan zodat je kan browsen terwijl je luistert
- **live chat:** real-time messaging met reply functie deze bleef soms hangen bij oude berichten bij de officiële site
- **programma overzicht:** beter overzicht van welke dj wanneer draait
- **cleaner code:** components structure, geen spaghetti meer

niet alles van het origineel is hier. dit is meer een proof of concept van hoe het volgens mij zou kunnen.

## wat werkt er

**audio player**

- blijft plakken aan de onderkant (sticky) zodat je kan navigeren terwijl je luistert
- volume slider die onthoud wat je laatste setting was
- reconnect als de stream dropped (gebeurt soms)
- works on mobile too

**design**

- tailwind voor styling (utility classes everywhere)
- glassmorphism effects omdat het er cool uitziet
- framer motion animaties
- responsive, werkt op je telefoon

**tech stack**

- react 18 + vite (sneller dan create-react-app)
- zustand voor state (simpeler dan redux)
- tailwind css
- framer motion voor animaties
- react router

## how to run this

```bash
npm install
npm run dev
```

ga naar `localhost:5173` en het werkt (hopelijk)

## project structuur

```
src/
├── components/     # alle components
├── pages/          # pagina's (home, chat, dj's, etc)
├── store/          # zustand store voor de player
├── App.jsx
└── main.jsx
```

## tech choices

waarom deze stack:

- vite instead of create-react-app (snellere dev builds, betere dx)
- zustand voor state (simpeler dan redux of context api)
- tailwind css (utility-first, geen custom css files nodig)
- framer motion (smoothe animaties zonder veel config)
- react router v6 (standaard voor spa routing)

## customize

**kleuren aanpassen:**
in `tailwind.config.js` staan de kleuren. pas aan wat je wilt.

**stream url:**
ga naar `src/store/playerStore.js` en change de `STREAM_URL`

**api endpoint:**
ook in playerStore.js, pas `API_URL` aan als je een andere backend hebt

## deploy

```bash
npm run build
```

upload de `dist/` folder naar vercel/netlify of wat je gebruikt

## troubleshooting

**player doet niks?**

- check de console (f12)
- kijk of de stream url klopt in playerStore.js
- sommige browsers blokkeren autoplay

**build werkt niet?**

```bash
rm -rf node_modules
npm install
```

**styles zijn kapot?**
rebuild: `npm run build`

---

redesign door bytevex voor mistyradio. origineel: [mistyradio.org](https://mistyradio.org)

toestemming verleend door bram (ceo/founder)

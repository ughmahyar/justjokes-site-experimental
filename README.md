# just jokes: website

The one-page site for **just jokes:**, a live pop-up stand-up comedy show in Malaysia.

## What's in here

```
index.html          the whole page (layout, styles and scripts)
assets/
  img/              photos, posters, logos and stickers
    laugh/          "i wanna see you laugh like them!!" strip
    sold/           sold-out posters strip
    about/          "what is this??" photo rows
    arch/           "shows we did" poster thumbnails
  fonts/            Jost, SoldOut and Reenie Beanie
  video/            hero background video
```

## Preview it

Open `index.html` in a browser, or run a tiny local server from this folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000


## Deploy

Live at https://justjokesmy.com. Deploy with `npx wrangler@4 deploy` from this folder
(see `wrangler.jsonc`). Only files not listed in `.assetsignore` are uploaded.

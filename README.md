# Simple Overlay for TOSU pp counter

> **Note**
>
> This repo was originally made for gosumemory, but it is now changed to use at TOSU for better api

This is a custom skin for the TOSU pp counter

https://github.com/tosuapp/tosu.

## Preview

### Song Select

![](./docs/Song-Select.png)

### In Game

![](./docs/In-Game.png)

## Installation

Simply clone the repo to your TOSU static folder.

Change your config.ini to use this skin (TOSU now uses custom in-game overlay, press ctrl+shift+space in game to toggle it)

```ini
[GameOverlay]; https://github.com/l3lackShark/gosumemory/wiki/GameOverlay
gameWidth = 1920
gameHeight = 1080
overlayURL = http://127.0.0.1:24050/SimpleOverlay
overlayWidth = 1920
overlayHeight = 1080
overlayOffsetX =0
overlayOffsetY =0
overlayScale =10

```

You can adjust the scale or dimensions to fit your screen

Restart Osu! to apply the changes (if nothing's changed, try restart both Gosumemory and Osu!)

## Development

Turns out, you can just make a single page svelte app using vite and bundle it. This is allows the use of tailwind + svelte reactivity

To start developing this skin go to the dev folder and run the following commands

```bash
npm install # I use bun install
npm run dev
```

Then when you're done you can run the following command to build the app into make TOSU able to read it.

```bash
npm run build
```

Your output should be in the `dist` directory

NOTE: There are some manual changes that need to be done.

1. All files should be in the same level, vite puts assets files like js/css into assets folder. Take them out and update `index.html`

```diff
- <script type="module" crossorigin src="/assets/index-DuVcxkUI.js"></script>
- <link rel="stylesheet" crossorigin href="/assets/index-Dm8lz_fQ.css" />
+ <script type="module" crossorigin src="./index-DuVcxkUI.js"></script>
+ <link rel="stylesheet" crossorigin href="./index-Dm8lz_fQ.css" />
```

2. This skin also uses custom font file, it's located in the assets folder too, so have to take it out and update the css file

```diff
# at the very bottom of the css file (you need to format it first)
@font-face {
  font-family: GothicRD;
- src: url(/assets/GothicRD-DzlrzHrH.ttf);
+ src: url(./GothicRD-DzlrzHrH.ttf);
}
```

TOSU should be able to correctly display the skin now.

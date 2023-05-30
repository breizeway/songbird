# [SongBird](https://songbird.tannor.net)

![image](https://github.com/breizeway/songbird/assets/70126993/676cad89-6ef2-4c74-85b7-8e96e0d31088)

## About

The problem: When jamming with friends I like to display the entirety of a song's lyrics and chords on a screen, all visible at the same time. It's always annoying to set and re-set this up for each song; it takes time to align windows next to each other and scroll to the right place. Plus lyric/tab websites are always filled with ads and extra cruft and the chord notations are never quite in the right spot.

Enter SongBird: A simple markdown editor for lyrics that displays the whole song at once. When you enter preview mode (or when the window is resized) the text is analyzed and the additional columns are generated and scrolled to the correct location so that all text is visible at once, each column a continuation of the previous one.

The priveiwer also supports extended markdown syntax to add inline chord notations in exactly the spot you want them. Use the pipe character (`|`) to denote the start and end of a chord notation. For example, the lyrics...

```
Cause I'm |E|in too |A|deep
And I'm |E|trying to |A|keep
Up a|E|bove in my |A|head
In|E|stead of going |A|under
```

will display as...
<br/>
![image](https://github.com/breizeway/songbird/assets/70126993/dd744f76-c6f1-4672-9d54-8aa57deb4488)

### Things to know
- This app is not currently optimized for mobile (and often throws an error) as it is meant to be used on a large screen. I don't see it being too useful on mobile, but I will likely fix it soon so that it at least doesn't throw an error.
- It's possible to get the previewer in a state where the columns are too numerous / to small to view, which makes it essentially unusable unless you increase window size or decrease zoom. I'll be working on a solution for this next.

## Roadmap

This app is in active development; a loose plan of upcoming features and fixes can be found in the [SongBird Roadmap project](https://github.com/users/breizeway/projects/1/views/1).

## Dev Guide

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, install node modules:
```zsh
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```zsh
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### About Next

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js/)

### Deployment

Deployed with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Notable Packages

- [React Markdown Preview](https://www.npmjs.com/package/@uiw/react-markdown-preview)

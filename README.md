# SongBird

## About

The problem: When jamming with friends I like to display the entirety of a songs lyrics and chords on a screen, all visible at the same time. It's always annoying to set and re-set this up for each song; it takes time to align windows next to each other and scroll to the right place. Plus lyric/tab websites are always filled with ads and extra cruft and the chord notations are never quite in the right spot.

Enter SongBird. A simple markdown editor and previewer that always displays the entirety of the text at the same time. When you enter preview mode (or when the window is resized) the text is analyzed and the additional columns are generated and scrolled to the correct location so that all text is visible, each column a continuation of the previous one.

It also has custom extended markdown syntax to enable chord notations in exactly the spot you want them. Use the pipe character (`|`) to denote the start and end of a chord notation. For example, the lyrics...

```
Cause I'm |E|in too |A|deep
And I'm |E|trying to |A|keep
Up a|E|bove in my |A|head
In|E|stead of going |A|under
```

will display as...

## Roadmap

A loose plan of upcoming features and fixes can be found in the [SongBird Roadmap project]().

## Dev Guide

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

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

## Deployment

Deployed with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notable Packages

- [React Markdown Preview](https://www.npmjs.com/package/@uiw/react-markdown-preview)

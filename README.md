This is a [Next.js](https://nextjs.org/) experimental project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Learning from
https://www.youtube.com/watch?v=ZVnjOPwW4ZA
https://www.youtube.com/watch?v=cwqNAkwhKqw&t=2587s
https://www.youtube.com/watch?v=i8PsGvDas-s
https://developer.themoviedb.org/docs
https://github.com/ducanhgh/next-pwa/

Notes:


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



Didn't work

Request {method: 'GET', url: 'http://localhost:3000/_next/image?url=https%3A%2F%…w500%2FryQbb26wl1ggtypXiZW0kjKZCrP.jpg&w=256&q=75', headers: Headers, destination: '', referrer: 'about:client', …}
body: (...)
bodyUsed: false
cache: "default"
credentials: "same-origin"
destination: ""
headers: Headers {}
integrity: ""
isHistoryNavigation: false
keepalive: false
method: "GET"
mode: "cors"
redirect: "follow"
referrer: "about:client"
referrerPolicy: ""
signal: AbortSignal {aborted: false, reason: undefined, onabort: null}
url: "http://localhost:3000/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FryQbb26wl1ggtypXiZW0kjKZCrP.jpg&w=256&q=75"
[[Prototype]]: Request


Worked

Request {method: 'GET', url: 'http://localhost:3000/_next/image?url=https%3A%2F%…w500%2FryQbb26wl1ggtypXiZW0kjKZCrP.jpg&w=256&q=75', headers: Headers, destination: '', referrer: '', …}
body: (...)
bodyUsed: false
cache: "default"
credentials: "omit"
destination: ""
headers: Headers {}
integrity: ""
isHistoryNavigation: false
keepalive: false
method: "GET"
mode: "no-cors"
redirect: "follow"
referrer: ""
referrerPolicy: ""
signal: AbortSignal {aborted: false, reason: undefined, onabort: null}
url: "http://localhost:3000/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FryQbb26wl1ggtypXiZW0kjKZCrP.jpg&w=256&q=75"
[[Prototype]]: Request



Works

Request {method: 'GET', url: 'http://localhost:3000/_next/image?url=https%3A%2F%…w500%2FmRGmNnh6pBAGGp6fMBMwI8iTBUO.jpg&w=256&q=75', headers: Headers, destination: '', referrer: '', …}
body: (...)
bodyUsed: false
cache: "default"
credentials: "omit"
destination: ""
headers: Headers {}
integrity: ""
isHistoryNavigation: false
keepalive: false
method: "GET"
mode: "no-cors"
redirect: "follow"
referrer: ""
referrerPolicy: ""
signal: AbortSignal {aborted: false, reason: undefined, onabort: null}
url: "http://localhost:3000/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FmRGmNnh6pBAGGp6fMBMwI8iTBUO.jpg&w=256&q=75"
[[Prototype]]: Request



Request {method: 'GET', url: 'http://localhost:3000/_next/image?url=https%3A%2F%…w500%2FmRGmNnh6pBAGGp6fMBMwI8iTBUO.jpg&w=256&q=75', headers: Headers, destination: '', referrer: '', …}
body: (...)
bodyUsed: false
cache: "default"
credentials: "omit"
destination: ""
headers: Headers {}
integrity: ""
isHistoryNavigation: false
keepalive: false
method: "GET"
mode: "no-cors"
redirect: "follow"
referrer: ""
referrerPolicy: ""
signal: AbortSignal {aborted: false, reason: undefined, onabort: null}
url: "http://localhost:3000/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FmRGmNnh6pBAGGp6fMBMwI8iTBUO.jpg&w=256&q=75"





// @deno-types="https://servestjs.org/@v1.0.0/types/react/index.d.ts";
import React from 'React'
import ReactDOMServer from 'ReactDOMServer'
import { createApp } from 'servest'
import App from './App.tsx'

const browserBundlePath = '/browser.js'
const js =
  `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${ App };\nReactDOM.hydrate(React.createElement(App), document.body);`
const html =
  `<html lang="ja">
    <head>
      <title>Hello, world</title>
      <script type="module" src="${ browserBundlePath }"></script>
      <style>* { font-family: Helvetica; }</style>
    </head>
    <body>
      ${ ReactDOMServer.renderToString(<App />) }
    </body>
  </html>`

const app = createApp()
app.handle('/', async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: html,
  })
})

app.handle(browserBundlePath, async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'application/javascript',
    }),
    body: js,
  })
})

app.listen({ port: 8000 })
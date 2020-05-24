// @deno-types="https://servestjs.org/@v1.0.0/types/react/index.d.ts";
import React from 'React'
import ReactDOMServer from 'ReactDOMServer'
import { Application, Router } from 'oak'
import App from './src/App.tsx'

const browserBundlePath = '/browser.js'
const js =
  `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${ App };\nReactDOM.hydrate(React.createElement(App), document.body);`

const CustomHead: React.FC = await import('./src/Head.tsx') // custom your head tag
  .then(HeadModule =>  HeadModule.default)
  .catch(e => () => <title>Hello, world</title>) // default title

const html =
  `<html lang="ja">
    <head>
      ${ReactDOMServer.renderToStaticMarkup(<CustomHead />)}
      <script type="module" src="${ browserBundlePath }"></script>
      <style>* { font-family: Helvetica; }</style>
    </head>
    <body>
      ${ ReactDOMServer.renderToString(<App />) }
    </body>
  </html>`

const router = new Router();
router
  .get("/", (context) => {
    context.response.headers = new Headers({
      'content-type': 'text/html; charset=UTF-8',
    })
    context.response.body = html;
  })
  .get(browserBundlePath, (context) => {
    context.response.headers = new Headers({
      'content-type': 'application/javascript',
    })
    context.response.body = js;
  })

const app = new Application()
app.use(router.routes());

console.log('serve: http://localhost:8000/')
await app.listen({ port: 8000 })

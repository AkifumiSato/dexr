// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'React'
import ReactDOMServer from 'ReactDOMServer'
import App from './src/App.tsx'

export const browserBundlePath = '/browser.js'
export const js =
  `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${ App };\nReactDOM.hydrate(React.createElement(App), document.getElementById('root'));`

const CustomHead: React.FC = await import('./src/Head.tsx') // custom your head tag
  .then(HeadModule => HeadModule.default)
  .catch(e => () => <title>Hello, world</title>) // default title

export const html =
  `<html lang="ja">
    <head>
      ${ ReactDOMServer.renderToStaticMarkup(<CustomHead />) }
      <style>* { font-family: Helvetica; }</style>
    </head>
    <body>
      <div id="root">${ ReactDOMServer.renderToString(<App />) }</div>
    </body>
    <script type="module" src="${ browserBundlePath }"></script>
  </html>`

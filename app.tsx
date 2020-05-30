// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'React'
import ReactDOMServer from 'ReactDOM/server'
import App from './src/App.tsx'

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
    <script type="module">
      import React from 'https://dev.jspm.io/react@16.13.1'
      import ReactDOM from 'https://dev.jspm.io/react-dom@16.13.1'
      const App = ${ App }
      ReactDOM.hydrate(React.createElement(App), document.getElementById('root'))
    </script>
  </html>`

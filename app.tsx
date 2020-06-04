// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server'

const DefaultHead: React.FC = () => <title>Hello, world</title>

type Components = {
  Head?: React.FC
  App: React.FC
}

export const renderHtml = ({ Head = DefaultHead, App }: Components) =>
  `<html lang="ja">
    <head>
      ${ ReactDOMServer.renderToStaticMarkup(<Head />) }
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

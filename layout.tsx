// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server'

const DefaultHead: React.FC = () => <title>Hello, world</title>

export type renderComponents = {
  layout: Layout
  App: React.FC
  componentPath: string
}

export const renderHtml = ({ layout, App, componentPath }: renderComponents) => {
  const Head = layout.head

  return `<html lang="ja">
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
      import App from '${ componentPath }'
  
      ReactDOM.hydrate(React.createElement(App), document.getElementById('root'))
    </script>
  </html>`
}

export class Layout {
  head: React.FC = DefaultHead

  /**
   * Register head contents.
   * If not specified, returns the value.
   **/
  addHead(Head: React.FC): this {
    this.head = Head
    return this
  }
}

export const createLayout = () => new Layout()

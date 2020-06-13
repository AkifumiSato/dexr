// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server'

const DefaultHead: React.FC = () => <title>Hello, world</title>

export type Template = (args: {
  head: string
  app: string
  componentPath: string
}) => string

export type RenderComponents = (renderParts: {
  Head: React.FC
  App: React.FC
}) => {
  head: string
  app: string
}

const defaultRenderComponents: RenderComponents = ({ Head, App }) => {
  const head = ReactDOMServer.renderToStaticMarkup(<Head />)
  const app = ReactDOMServer.renderToString(<App />)

  return { head, app }
}

const defaultTemplate: Template = ({ head, app, componentPath }) => `<html>
  <head>
    ${ head }
    <style>* { font-family: Helvetica; }</style>
  </head>
  <body>
    <div id="root">${ app }</div>
  </body>
  <script type="module">
    import React from 'https://dev.jspm.io/react@16.13.1'
    import ReactDOM from 'https://dev.jspm.io/react-dom@16.13.1'
    import App from '${ componentPath }'

    ReactDOM.hydrate(React.createElement(App), document.getElementById('root'))
  </script>
</html>`

export class Renderer {
  head: React.FC = DefaultHead
  #renderComponents: RenderComponents = defaultRenderComponents
  #template: Template = defaultTemplate

  useHead(Head: React.FC): this {
    this.head = Head
    return this
  }

  useRenderComponents(enhance: RenderComponents): this {
    this.#renderComponents = enhance
    return this
  }

  useTemplate(template: Template): this {
    this.#template = template
    return this
  }

  render(App: React.FC, componentPath: string) {
    const { head, app } = this.#renderComponents({
      App,
      Head: this.head,
    })

    return this.#template({ head, app, componentPath })
  }
}

export const createRenderer = () => new Renderer()

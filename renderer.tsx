// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server'

const DefaultHead: React.FC = () => <title>Hello, world</title>

export type Template = (args: {
  head: string
  app: string
  componentPath: string
  appProps: Object
}) => string

export type RenderComponents = (renderParts: {
  Head: React.FC
  App: React.FC
}, appProps: any) => {
  head: string
  app: string
}

const defaultRenderComponents: RenderComponents = ({ Head, App }, appProps) => {
  const head = ReactDOMServer.renderToStaticMarkup(<Head />)
  const app = ReactDOMServer.renderToString(<App { ...appProps } />)

  return { head, app }
}

const defaultTemplate: Template = ({ head, app, componentPath, appProps }) => {
  const jsonProps = JSON.stringify(appProps)

  return `<html>
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
    
    ReactDOM.hydrate(React.createElement(App, ${jsonProps}), document.getElementById('root'))
  </script>
</html>`
}

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

  render(App: React.FC, componentPath: string, appProps: any = {}) {
    const { head, app } = this.#renderComponents({
      App,
      Head: this.head,
    }, appProps)

    return this.#template({ head, app, componentPath, appProps })
  }
}

export const createRenderer = () => new Renderer()

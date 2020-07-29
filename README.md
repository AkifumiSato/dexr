# Dexr
Small Server Side Rendering library on Deno.

## engines
* deno: v1.2.1^ 

## Basic usage
```typescript
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'

const dexr = createDexr()
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

## API
### createDexr
Create DexrApp instance.
```typescript
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'
// --snip--
const dexr = createDexr()
```

### DexrApp
#### .useRenderer(layout: Renderer): DexrApp
Register the Renderer used when render.
```typescript
import { createRenderer } from 'https://deno.land/x/dexr/renderer.tsx'
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'
// --snip--
const renderer = createRenderer()
// --snip--
const dexr = createDexr().useRenderer(renderer)
```

#### .addPage(route: string, componentPath: string): Promise<void>
Register the route and app component path.
```typescript
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'
// --snip--
const dexr = createDexr()
await dexr.addPage('/', '/App.tsx')
```

#### .addPage<T extends {}, U extends {}, P extends {}>(route: string, componentPath: string, renderProps?: (params: T, query: U) => Promise<P>): Promise<void>
Register the route and app component path.
```typescript
import { delay } from 'https://deno.land/std@0.57.0/async/delay.ts'
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'
import { Props as BookProps } from './Book.tsx'
// --snip--
const dexr = createDexr()
await dexr.addPage<{ id: string }, { foo?: string }, BookProps>('/book/:id', '/Book.tsx', (params, query) => Promise.resolve({
  id: params.id,
  foo: query.foo ?? '[default]',
}))

type BookParams = {
  id: string
}

type BookQuery = {
  foo?: string
}

await dexr.addPage<BookParams, BookQuery, BookProps>('/book_async/:id', '/Book.tsx', async (params, query) => {
  await delay(1000) // async callback
  return {
    id: params.id,
    foo: query.foo ?? '[default]',
  }
})
```

#### .run(option?: Option): Promise<void>
Run Dexr application.
```typescript
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'
// --snip--
const dexr = createDexr()
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

### createRenderer
Create Renderer instance.
```typescript
import { createRenderer } from 'https://deno.land/x/dexr/renderer.tsx'
// --snip--
const renderer = createRenderer()
```

### Renderer
#### .useHead(Head: React.FC): Renderer
Register Head component.
```typescript
import { createRenderer } from 'https://deno.land/x/dexr/renderer.tsx'
import Head from './Head.tsx'
// --snip--
const renderer = createRenderer().useHead(Head)
```

#### .useRenderComponents(enhance: RenderComponents): Renderer
Register callback on components render.
```typescript
import React from 'https://dev.jspm.io/react@16.13.1'
import { createRenderer, RenderComponents } from 'https://deno.land/x/dexr/renderer.tsx'
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server'
// --snip--
const renderComponents: RenderComponents = ({ Head, App }) => {
  const head = ReactDOMServer.renderToStaticMarkup(<Head />)
  const app = ReactDOMServer.renderToString(<App />)

  return { head, app }
}
const renderer = createRenderer().useRenderComponents(renderComponents)
```

#### .useTemplate(template: Template): Renderer
Register callback on render template.
```typescript
import { createRenderer, Template } from 'https://deno.land/x/dexr/renderer.tsx'
// --snip--
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
const renderer = createRenderer().useTemplate(defaultTemplate)
```

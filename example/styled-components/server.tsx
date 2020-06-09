// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server'
import { createRenderer, RenderComponents } from '../../renderer.tsx'
import { createDexr } from '../../mod.ts'
import Head from './Head.tsx'
import * as styledComponents from 'https://dev.jspm.io/styled-components@5.1.1'

const { ServerStyleSheet } = styledComponents.default

const renderComponents: RenderComponents = ({ Head, App }) => {
  const sheet = new ServerStyleSheet()

  try {
    const app = ReactDOMServer.renderToString(sheet.collectStyles(<App />))
    const head = ReactDOMServer.renderToStaticMarkup(
      <>
        <Head />
        { sheet.getStyleElement() }
      </>
    )
    return {
      app,
      head,
    }
  } catch (error) {
    // handle error
    console.error(error)
    throw new Error(error.message)
  } finally {
    sheet.seal()
  }
}

const renderer = createRenderer()
  .useHead(Head)
  .useRenderComponents(renderComponents)

const dexr = createDexr()
  .useRenderer(renderer)
await dexr.addPage('/', '/App.tsx')
await dexr.run()

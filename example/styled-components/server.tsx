// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server'
import { createLayout, MapRenderComponent } from '../../layout.tsx'
import { createDexr } from '../../mod.ts'
import Head from './Head.tsx'
import * as styledComponents from 'https://dev.jspm.io/styled-components@5.1.1'

const { ServerStyleSheet } = styledComponents.default

const mapRenderComponent: MapRenderComponent = ({ Head, App, componentPath }) => {
  const sheet = new ServerStyleSheet()
  let contents
  let styleTags
  try {
    contents = ReactDOMServer.renderToString(sheet.collectStyles(<App />))
    styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
  } catch (error) {
    // handle error
    console.error(error)
  } finally {
    sheet.seal()
  }
  const head = ReactDOMServer.renderToStaticMarkup(<Head />) + styleTags

  return {
    head,
    contents,
    componentPath,
  }
}

const layout = createLayout()
  .addHead(Head)
layout.mapRenderComponents = mapRenderComponent

const dexr = createDexr()
  .useLayout(layout)
await dexr.addPage('/', '/App.tsx')
await dexr.run()

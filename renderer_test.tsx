// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import { assertStrContains } from 'https://deno.land/std@0.55.0/testing/asserts.ts'
import { createRenderer, Template, RenderComponents } from './renderer.tsx'

const testTemplate: Template = ({ head, app, componentPath }) => `<html>
    <head>
      ${ head }
    </head>
    <body>
      <div id="test">${ app }</div>
    </body>
  </html>`

const testRenderComponents: RenderComponents = () => {
  const head = '<title>test render components</title>'
  const app = '<h1>test render components</h1>'

  return { head, app }
}

Deno.test('default config render', () => {
  const renderer = createRenderer()
  const App: React.FC = () => (
    <div>
      <h1>Dexr test title!</h1>
      <p>Dexr text.</p>
    </div>
  )
  const renderString = renderer.render(App, '')
  assertStrContains(renderString, '<title>Hello, world</title>')
  assertStrContains(renderString, '<h1>Dexr test title!</h1>')
  assertStrContains(renderString, '<p>Dexr text.</p>')
})

Deno.test('useHead', () => {
  const TestHead = () => <title>Custom Head</title>
  const renderer = createRenderer().useHead(TestHead)

  const App: React.FC = () => (
    <div>
      <h1>Dexr test title!</h1>
      <p>Dexr text.</p>
    </div>
  )
  assertStrContains(renderer.render(App, ''), '<title>Custom Head</title>')
  assertStrContains(renderer.render(App, ''), '<h1>Dexr test title!</h1>')
})

Deno.test('useTemplate', () => {
  const renderer = createRenderer().useRenderComponents(testRenderComponents)

  const App: React.FC = () => (
    <div>
      <h1>Dexr test title!</h1>
      <p>Dexr text.</p>
    </div>
  )
  assertStrContains(renderer.render(App, ''), '<title>test render components</title>')
  assertStrContains(renderer.render(App, ''), '<h1>test render components</h1>')
})

Deno.test('useTemplate', () => {
  const renderer = createRenderer().useTemplate(testTemplate)

  const App: React.FC = () => (
    <div>
      <h1>Dexr test title!</h1>
      <p>Dexr text.</p>
    </div>
  )
  assertStrContains(renderer.render(App, ''), '<h1>Dexr test title!</h1>')
  assertStrContains(renderer.render(App, ''), 'id="test"')
})

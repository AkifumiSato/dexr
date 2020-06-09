// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import { assertStrContains } from 'https://deno.land/std@0.55.0/testing/asserts.ts'
import { createRenderer, defaultRenderComponents } from './renderer.tsx'

Deno.test('defaultRenderComponents string', () => {
  const App: React.FC = () => (
    <div>
      <h1>Dexr test title!</h1>
      <p>Dexr text.</p>
    </div>
  )
  const Head: React.FC = () => <title>test title</title>
  const { head, app } = defaultRenderComponents({ App, Head })
  assertStrContains(head, '<title>test title</title>')
  assertStrContains(app, '<h1>Dexr test title!</h1>')
  assertStrContains(app, '<p>Dexr text.</p>')
})

Deno.test('custom head tag defaultRenderComponents string', () => {
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
  assertStrContains(renderer.render(App, ''), '<p>Dexr text.</p>')
})

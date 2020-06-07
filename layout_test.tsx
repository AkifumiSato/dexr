// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import { assertStrContains } from 'https://deno.land/std@0.55.0/testing/asserts.ts'
import { createLayout, renderHtml } from './layout.tsx'

Deno.test('default head tag render string', () => {
  const layout = createLayout()
  const App: React.FC = () => (
    <div>
      <h1>Dexr test title!</h1>
      <p>Dexr text.</p>
    </div>
  )
  assertStrContains(renderHtml({ layout, App }), '<title>Hello, world</title>')
  assertStrContains(renderHtml({ layout, App }), '<h1>Dexr test title!</h1>')
  assertStrContains(renderHtml({ layout, App }), '<p>Dexr text.</p>')
})

Deno.test('custom head tag render string', () => {
  const TestHead = () => <title>Custom Head</title>
  const layout = createLayout()
    .addHead(TestHead)
  const App: React.FC = () => (
    <div>
      <h1>Dexr test title!</h1>
      <p>Dexr text.</p>
    </div>
  )
  assertStrContains(renderHtml({ layout, App }), '<title>Custom Head</title>')
  assertStrContains(renderHtml({ layout, App }), '<h1>Dexr test title!</h1>')
  assertStrContains(renderHtml({ layout, App }), '<p>Dexr text.</p>')
})

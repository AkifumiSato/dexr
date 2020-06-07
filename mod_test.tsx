// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import { assertEquals, assertStrictEq } from 'https://deno.land/std@0.55.0/testing/asserts.ts'
import { spy, Spy } from 'https://raw.githubusercontent.com/udibo/mock/v0.3.0/spy.ts'
import { Layout, renderComponents } from './layout.tsx'
import { DexrApp } from './mod.ts'
import { Router } from 'https://deno.land/x/oak@v4.0.0/router.ts'

type Context = {
  response: {
    headers?: Headers
    body?: string
  }
}

class RenderHtmlStack {
  lastUseLayout?: Layout
  callback: (args: renderComponents) => string
  readonly dummyResult: string = `<p>render success</p>`

  constructor() {
    this.callback = spy((args: renderComponents) => {
      this.lastUseLayout = args.layout
      return this.dummyResult
    })
  }
}

Deno.test('useLayout, addPage logic', () => {
  const renderHtmlStack = new RenderHtmlStack()
  const router = new Router()
  const routerGetSpy = spy(router, 'get')
  const dummyLayout = new Layout()

  const dexr = new DexrApp({
    router: router,
    renderer: renderHtmlStack.callback,
  })
  dexr
    .useLayout(dummyLayout)
    .addPage('test', () => <p>App</p>)

  assertEquals(routerGetSpy.calls.length, 1)

  const { args, self } = routerGetSpy.calls[0]
  assertEquals(self, router)

  const [route, handler] = args
  assertEquals(route, 'test')

  const dummyContext: Context = {
    response: {}
  }
  handler(dummyContext)
  assertEquals(dummyContext.response.body, renderHtmlStack.dummyResult)
  assertStrictEq(renderHtmlStack.lastUseLayout, dummyLayout)

  routerGetSpy.restore()
})

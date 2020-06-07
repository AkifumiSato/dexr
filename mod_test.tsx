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

class MockRouterManager {
  router: Router
  getSpy: Spy<Router>
  dummyLayout: Layout
  lastUseLayout?: Layout
  spyRenderHtml: (args: renderComponents) => string
  readonly renderHtmlResult: string = `<p>render success</p>`

  constructor() {
    this.router = new Router()
    this.getSpy = spy(this.router, 'get')
    this.dummyLayout = new Layout()
    this.spyRenderHtml = spy((args: renderComponents) => {
      this.lastUseLayout = args.layout
      return this.renderHtmlResult
    })
  }

  restoreAll() {
    this.getSpy.restore()
  }
}

Deno.test('useLayout, addPage logic', () => {
  const mockRouterManager = new MockRouterManager()

  const dexr = new DexrApp(mockRouterManager.router, undefined, mockRouterManager.spyRenderHtml)
  dexr
    .useLayout(mockRouterManager.dummyLayout)
    .addPage('test', () => <p>App</p>)

  assertEquals(mockRouterManager.getSpy.calls.length, 1)

  const { args, self } = mockRouterManager.getSpy.calls[0]
  assertEquals(self, mockRouterManager.router)

  const [route, handler] = args
  assertEquals(route, 'test')

  const dummyContext: Context = {
    response: {}
  }
  handler(dummyContext)
  assertEquals(dummyContext.response.body, mockRouterManager.renderHtmlResult)
  assertStrictEq(mockRouterManager.lastUseLayout, mockRouterManager.dummyLayout)

  mockRouterManager.restoreAll()
})

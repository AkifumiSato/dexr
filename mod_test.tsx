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

  constructor() {
    this.router = new Router()
    this.getSpy = spy(this.router, 'get')
  }

  restoreAll() {
    this.getSpy.restore()
  }
}

Deno.test('useLayout, addPage logic', () => {
  const mockRouterManager = new MockRouterManager()
  const renderHtmlResult = `<p>render success</p>`
  let layoutOnRender: Layout | null = null
  const dummyLayout = new Layout()
  const spyRenderHtml = spy((args: renderComponents) => {
    layoutOnRender = args.layout
    return renderHtmlResult
  })

  const dexr = new DexrApp(mockRouterManager.router, undefined, spyRenderHtml)
  dexr
    .useLayout(dummyLayout)
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
  assertEquals(dummyContext.response.body, renderHtmlResult)

  assertStrictEq(layoutOnRender, dummyLayout)

  mockRouterManager.restoreAll()
})

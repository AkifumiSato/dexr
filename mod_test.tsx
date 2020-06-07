// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import { assertEquals, assertStrictEq } from 'https://deno.land/std@0.55.0/testing/asserts.ts'
import { spy } from 'https://raw.githubusercontent.com/udibo/mock/v0.3.0/spy.ts'
import { Layout, renderComponents } from './layout.tsx'
import { DexrApp } from './mod.ts'
import { Router } from 'https://deno.land/x/oak@v5.1.0/router.ts'
import { Application, ListenOptions } from 'https://deno.land/x/oak@v5.1.0/application.ts'
import {
  serve as denoServe,
  Server,
  ServerRequest,
} from 'https://deno.land/x/oak@v5.1.0/deps.ts'

let serverRequestStack: ServerRequest[] = []

const teardown = () => {
  serverRequestStack = []
}

class MockServer {
  close(): void {
  }

  async* [Symbol.asyncIterator]() {
    for await (const request of serverRequestStack) {
      yield request
    }
  }
}

const serve: typeof denoServe = function (
  addr: string | ListenOptions,
): Server {
  return new MockServer() as Server
}

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
  const spyRouterGet = spy(router, 'get')
  const dummyLayout = new Layout()

  const dexr = new DexrApp({
    router: router,
    renderer: renderHtmlStack.callback,
  })
  dexr
    .useLayout(dummyLayout)
    .addPage('test', () => <p>App</p>)

  assertEquals(spyRouterGet.calls.length, 1)

  const { args, self } = spyRouterGet.calls[0]
  assertEquals(self, router)

  const [route, handler] = args
  assertEquals(route, 'test')

  const dummyContext: Context = {
    response: {}
  }
  handler(dummyContext)
  assertEquals(dummyContext.response.body, renderHtmlStack.dummyResult)
  assertStrictEq(renderHtmlStack.lastUseLayout, dummyLayout)

  spyRouterGet.restore()
})

Deno.test('run logic', async () => {
  const application = new Application({ serve })
  const router = new Router()
  // const spyUse = spy(application, 'use')
  const spyListen = spy(application, 'listen')

  // const dexr = new DexrApp({ application, router })
  const dexr = new DexrApp({ application, router })
  await dexr.run()

  assertEquals(spyListen.calls.length, 1)
  assertEquals(spyListen.calls[0].args[0], {
    port: 8000,
  })

  teardown()
})

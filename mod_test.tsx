// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import { assertEquals, assertStrictEq } from 'https://deno.land/std@0.55.0/testing/asserts.ts'
import { spy } from 'https://raw.githubusercontent.com/udibo/mock/v0.3.0/spy.ts'
import { stub } from 'https://raw.githubusercontent.com/udibo/mock/v0.3.0/stub.ts'
import { Renderer } from './renderer.tsx'
import { DexrApp } from './mod.ts'
import { Router } from 'https://deno.land/x/oak@v6.0.1//router.ts'
import { Application, ListenOptions } from 'https://deno.land/x/oak@v6.0.1//application.ts'
import {
  Serve,
  Server,
  ServerRequest,
} from 'https://deno.land/x/oak@v6.0.1/types.d.ts'

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

const serve: Serve = function (
  addr: string | ListenOptions,
): Server {
  return new MockServer() as Server
}

type Context = {
  request: {
    url: {
      searchParams: Array<[string, any]>
    }
  }
  response: {
    headers?: Headers
    body?: string
  }
}

Deno.test('useRenderer, addPage logic', async () => {
  const router = new Router()
  const spyRouterGet = spy(router, 'get')
  const renderer = new Renderer()
  const render = stub(renderer, 'render')
  const renderResult = '<p>test success!</p>'
  render.returns = [renderResult]

  const dexr = new DexrApp({
    router: router,
  })
  await dexr
    .useRenderer(renderer)
    .addPage('test', '/example/hello-world/App.tsx')

  assertEquals(spyRouterGet.calls.length, 1)

  const { args, self } = spyRouterGet.calls[0]
  assertEquals(self, router)

  const [route, handler] = args
  assertEquals(route, 'test')

  const dummyContext: Context = {
    request: {
      url: {
        searchParams: []
      }
    },
    response: {}
  }
  handler(dummyContext)
  assertEquals(dummyContext.response.body, renderResult)

  spyRouterGet.restore()
})

Deno.test('run logic', async () => {
  const application = new Application({ serve })
  const router = new Router()
  const spyUse = spy(application, 'use')
  const spyListen = spy(application, 'listen')

  const dexr = new DexrApp({ application, router })
  await dexr.run()

  assertEquals(spyUse.calls.length, 1)
  assertStrictEq(spyUse.calls[0].args[0].router, router)

  assertEquals(spyListen.calls.length, 1)
  assertEquals(spyListen.calls[0].args[0], {
    port: 8000,
  })

  teardown()
})

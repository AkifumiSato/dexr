// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import { Application, Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import { renderHtml } from './app.tsx'

export { React }

type Option = {
  port?: number
}

class DexrApp {
  #router: Router
  #isStart: boolean = false
  #head?: React.FC

  constructor() {
    this.#router = new Router()
  }

  /**
   * Register head contents.
   * If not specified, returns the value.
   **/
  addHead(Head: React.FC): this {
    this.#head = Head
    return this
  }

  /**
   * Register route with given route.
   * It will response with render html embed App Component.
   **/
  addPage(route: string, App: React.FC): this {
    const Head = this.#head

    this.#router.get(route, (context) => {
      context.response.headers = new Headers({
        'content-type': 'text/html; charset=UTF-8',
      })
      context.response.body = renderHtml({ App, Head })
    })
    return this
  }

  /**
   * Start SSR Server.
   **/
  async run(option?: Option) {
    if (this.#isStart) throw new Error('Dexr is already run!!!')

    const {
      port = 8000,
    } = option || {}

    const app = new Application()
    app.use(this.#router.routes())

    app.listen({ port })
    this.#isStart = true
    console.log('serve: http://localhost:8000/')
  }
}

export const createDexr = () => new DexrApp()

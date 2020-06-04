// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import { Application, Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import { renderHtml } from './app.tsx'

export { React }

type Option = {
  port?: number
}

export class Dexr {
  #router: Router
  #isStart: boolean = false

  constructor() {
    this.#router = new Router()
  }

  /**
   * Register route with given route.
   * It will response with render html embed App Component.
   **/
  addPage(route: string, App: React.FC): this {
    this.#router.get(route, (context) => {
      context.response.headers = new Headers({
        'content-type': 'text/html; charset=UTF-8',
      })
      context.response.body = renderHtml(App)
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

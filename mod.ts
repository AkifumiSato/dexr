// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import { Application, Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import { createLayout, Layout, renderHtml } from './layout.tsx'

export { React }

type Option = {
  port?: number
}

class DexrApp {
  #router: Router
  #isStart: boolean = false
  #layout: Layout

  constructor() {
    this.#router = new Router()
    this.#layout = createLayout()
  }

  /**
   * Register Layout with given layout.
   **/
  useLayout(layout: Layout): this {
    this.#layout = layout

    return this
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
      context.response.body = renderHtml({ App, layout: this.#layout })
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

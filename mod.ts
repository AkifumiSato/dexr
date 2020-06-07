// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import { Application, Router } from 'https://deno.land/x/oak@v5.1.0/mod.ts'
import { renderComponents, Layout, renderHtml } from './layout.tsx'

export { React }

type Option = {
  port?: number
}

type Dependencies = {
  application?: Application
  router?: Router
  layout?: Layout
  renderer?: (args: renderComponents) => string
}

export class DexrApp {
  readonly #application: Application
  readonly #router: Router
  readonly #renderer: (args: renderComponents) => string
  #layout: Layout
  #isStart: boolean = false
  #compiledModule: Map<string, string> = new Map()

  constructor(dependencies?: Dependencies) {
    this.#application = dependencies?.application ?? new Application()
    this.#router = dependencies?.router ?? new Router()
    this.#layout = dependencies?.layout ?? new Layout()
    this.#renderer = dependencies?.renderer ?? renderHtml
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
  async addPage(route: string, componentPath: string) {
    const fullPath = Deno.cwd() + componentPath
    const App = (await import(fullPath)).default

    const [, script] = await Deno.compile(fullPath)
    Object.entries(script).forEach(([key, source]) => {
      this.#compiledModule.set(key.replace(`file://${ Deno.cwd() }`, ''), source)
    })

    this.#router.get(route, (context) => {
      context.response.headers = new Headers({
        'content-type': 'text/html; charset=UTF-8',
      })
      context.response.body = this.#renderer({ App, layout: this.#layout, componentPath })
    })
  }

  /**
   * Start SSR Server.
   **/
  async run(option?: Option) {
    if (this.#isStart) throw new Error('Dexr is already run!!!')

    // sync deno's import/client import
    for (const [key, source] of this.#compiledModule.entries()) {
      if (!key.includes('.js.map')) {
        this.#router.get(key.replace('.js', '.tsx'), (context) => {
          context.response.headers = new Headers({
            'content-type': 'text/javascript; charset=UTF-8',
          })
          context.response.body = source
        })
      }
    }

    const {
      port = 8000,
    } = option || {}

    this.#application.use(this.#router.routes())
    this.#application.listen({ port })
    this.#isStart = true
    console.log(`serve: http://localhost:${ port }/`)
  }
}

export const createDexr = () => new DexrApp()

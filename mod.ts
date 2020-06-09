// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import { Application, Router } from 'https://deno.land/x/oak@v5.1.0/mod.ts'
import { join, fromFileUrl } from 'https://deno.land/std/path/mod.ts'
import { Renderer, createRenderer } from './renderer.tsx'

export { React }

type Option = {
  port?: number
}

type Dependencies = {
  application?: Application
  router?: Router
  renderer?: Renderer
}

export class DexrApp {
  readonly #application: Application
  readonly #router: Router
  #renderer: Renderer
  #isStart: boolean = false
  #compiledModule: Map<string, string> = new Map()

  constructor(dependencies?: Dependencies) {
    this.#application = dependencies?.application ?? new Application()
    this.#router = dependencies?.router ?? new Router()
    this.#renderer = dependencies?.renderer ?? createRenderer()
  }

  useRenderer(layout: Renderer): this {
    this.#renderer = layout
    return this
  }

  async addPage(route: string, componentPath: string) {
    const fullPath = join(Deno.cwd(), componentPath)
    const App = (await import(fullPath)).default

    const [, script] = await Deno.compile(fullPath)
    Object.entries(script).forEach(([key, source]) => {
      const filePath = fromFileUrl(key).replace(Deno.cwd(), '')
      this.#compiledModule.set(filePath, source)
    })

    this.#router.get(route, (context) => {
      context.response.headers = new Headers({
        'content-type': 'text/html; charset=UTF-8',
      })
      context.response.body = this.#renderer.render(App, componentPath)
    })
  }

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

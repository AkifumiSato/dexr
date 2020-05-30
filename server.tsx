// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import { Application, Router } from 'oak'
import { browserBundlePath, html, js } from './app.tsx'

const router = new Router()
router
  .get('/', (context) => {
    context.response.headers = new Headers({
      'content-type': 'text/html; charset=UTF-8',
    })
    context.response.body = html
  })
  .get(browserBundlePath, (context) => {
    context.response.headers = new Headers({
      'content-type': 'application/javascript',
    })
    context.response.body = js
  })

const app = new Application()
app.use(router.routes())

console.log('serve: http://localhost:8000/')
await app.listen({ port: 8000 })

import { delay } from 'https://deno.land/std@0.62.0/async/delay.ts'
import { createRenderer } from '../../renderer.tsx'
import { createDexr } from '../../mod.ts'
import { Props as BookProps } from './Book.tsx'
import Head from './Head.tsx'

const renderer = createRenderer().useHead(Head)

const dexr = createDexr().useRenderer(renderer)
await dexr.addPage('/', './App.tsx')
await dexr.addPage<{ id: string }, { foo?: string }, BookProps>('/book/:id', '/Book.tsx', (params, query) => Promise.resolve({
  id: params.id,
  foo: query.foo ?? '[default]',
}))

type BookParams = {
  id: string
}

type BookQuery = {
  foo?: string
}

await dexr.addPage<BookParams, BookQuery, BookProps>('/book_async/:id', '/Book.tsx', async (params, query) => {
  await delay(1000) // async callback
  return {
    id: params.id,
    foo: query.foo ?? '[default]',
  }
})
await dexr.run()

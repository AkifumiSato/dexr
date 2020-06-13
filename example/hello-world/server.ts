import { createRenderer } from '../../renderer.tsx'
import { createDexr } from '../../mod.ts'
import { Props as BookProps } from './Book.tsx'
import Head from './Head.tsx'

const renderer = createRenderer().useHead(Head)

const dexr = createDexr().useRenderer(renderer)
await dexr.addPage('/', './App.tsx')
await dexr.addPage<{ id: string }, { foo?: string }, BookProps>('/book/:id', '/Book.tsx', (params, query) => ({
  id: params.id,
  foo: query.foo ?? '[default]',
}))
await dexr.run()

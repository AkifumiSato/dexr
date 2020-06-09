import { createRenderer } from '../../renderer.tsx'
import { createDexr } from '../../mod.ts'
import Head from './Head.tsx'

const renderer = createRenderer().useHead(Head)

const dexr = createDexr().useRenderer(renderer)
await dexr.addPage('/', './App.tsx')
await dexr.run()

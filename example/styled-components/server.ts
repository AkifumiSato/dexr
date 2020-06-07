import { createLayout } from '../../layout.tsx'
import { createDexr } from '../../mod.ts'
import Head from './Head.tsx'

const layout = createLayout()
  .addHead(Head)

const dexr = createDexr().useLayout(layout)
await dexr.addPage('/', '/App.tsx')
await dexr.run()

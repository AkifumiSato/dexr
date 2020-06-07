import { createLayout } from '../../layout.tsx'
import { createDexr } from '../../mod.ts'
import Head from './Head.tsx'

const layout = createLayout()
  .addHead(Head)

const dexr = await createDexr().useLayout(layout)
await dexr.addPage('/', '/App.tsx')
dexr.run()

import { createLayout } from '../layout.tsx'
import { createDexr } from '../mod.ts'
import App from './App.tsx'
import Head from './Head.tsx'

const layout = createLayout()
  .addHead(Head)

await createDexr()
  .useLayout(layout)
  .addPage('/', App)
  .run()

import { createDexr } from '../mod.ts'
import App from './App.tsx'
import Head from './Head.tsx'

await createDexr()
  .addHead(Head)
  .addPage('/', App)
  .run()

import { Dexr } from '../mod.ts'
import App from './App.tsx'
import Head from './Head.tsx'

const dexr = new Dexr()
await dexr
  .addHead(Head)
  .addPage('/', App)
  .run()

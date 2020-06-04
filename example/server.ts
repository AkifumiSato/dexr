import { Dexr } from '../mod.ts'
import App from './App.tsx'

const dexr = new Dexr()
await dexr
  .addPage('/', App)
  .run()

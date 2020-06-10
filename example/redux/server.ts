import { createDexr } from '../../mod.ts'

const dexr = createDexr()
await dexr.addPage('/', './App.tsx')
await dexr.run()

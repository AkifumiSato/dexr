# Dexr
Small Server Side Rendering library on Deno.

## engines
* deno: v1.0.3^ 

## Run
```typescript
import { createDexr } from '../../mod.ts'

const dexr = createDexr()
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

## Use custom head
```typescript
import { createRenderer } from '../../renderer.tsx'
import { createDexr } from '../../mod.ts'
import Head from './Head.tsx'

const renderer = createRenderer().useHead(Head)

const dexr = createDexr().useRenderer(renderer)
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

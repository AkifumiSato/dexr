# Dexr
Small Server Side Rendering library on Deno.

## engines
* deno: v1.0.3^ 

## Run
```typescript
import { createDexr } from 'https://raw.githubusercontent.com/AkifumiSato/dexr/master/mod.ts'

const dexr = createDexr()
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

## Use custom head
```typescript
import { createRenderer } from 'https://raw.githubusercontent.com/AkifumiSato/dexr/master/renderer.tsx'
import { createDexr } from 'https://raw.githubusercontent.com/AkifumiSato/dexr/master/mod.ts'
import Head from './Head.tsx'

const renderer = createRenderer().useHead(Head)

const dexr = createDexr().useRenderer(renderer)
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

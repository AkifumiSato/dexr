# Dexr
Small Server Side Rendering library on Deno.

## engines
* deno: v1.0.3^ 

## Run
```typescript
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'

const dexr = createDexr()
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

## Use custom head
```typescript
import { createRenderer } from 'https://deno.land/x/dexr/renderer.tsx'
import { createDexr } from 'https://deno.land/x/dexr/mod.ts'
import Head from './Head.tsx'

const renderer = createRenderer().useHead(Head)

const dexr = createDexr().useRenderer(renderer)
await dexr.addPage('/', '/App.tsx')
await dexr.run()
```

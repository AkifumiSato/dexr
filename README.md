# Dexr
Small application framework on the React.

## env
* deno: v1.0.3 

## Run
```typescript
import { createDexr } from '../mod.ts'

const dexr = await createDexr()
await dexr.addPage('/', '/App.tsx')
dexr.run()
```

## Use custom head
```typescript
import { createLayout } from '../../layout.tsx'
import { createDexr } from '../../mod.ts'
import Head from './Head.tsx'

const layout = createLayout()
  .addHead(Head)

const dexr = await createDexr().useLayout(layout)
await dexr.addPage('/', '/App.tsx')
dexr.run()
```

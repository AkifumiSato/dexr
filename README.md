# Dexr
Small application framework on the React.

## env
* deno: v1.0.3 

## Run
```typescript
import { createDexr } from '../mod.ts'
import App from './App.tsx'

await createDexr()
  .addPage('/', App)
  .run()
```

## Use custom head
```typescript
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
```

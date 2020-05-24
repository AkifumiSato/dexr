// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'

const App: React.FC = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <h1>Hello DenoLand!</h1>
      <button onClick={ () => setCount(count + 1) }>Click the 🦕</button>
      <p>You clicked the 🦕 { count } times</p>
    </div>
  )
}

export default App
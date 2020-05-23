// @deno-types="https://servestjs.org/@v1.0.0/types/react/index.d.ts";
import React from 'React'

const App = () => {
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
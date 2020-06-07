import { React } from '../../mod.ts'

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
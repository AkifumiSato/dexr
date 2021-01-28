import Layout from '../components/Layout.tsx'
import { React } from "../../../deps.ts";

const App: React.FC = () => {
  const [count, setCount] = React.useState(0)

  return (
    <Layout>
      <h1>Hello DenoLand!</h1>
      <button onClick={ () => setCount(count + 1) }>Click the 🦕</button>
      <p>You clicked the 🦕 { count } times</p>
    </Layout>
  )
}

export default App
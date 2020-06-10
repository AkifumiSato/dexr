// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
import Redux from 'https://dev.jspm.io/react-redux@7.2.0'
import { State, store } from './store.ts'

const { Provider, useSelector, useDispatch } = Redux

const Contents: React.FC = () => {
  const count = useSelector((state: State) => state.click.count)
  const dispatch = useDispatch()
  const increment = React.useCallback(() => {
    dispatch({ type: 'INCREMENT' })
  }, [dispatch])

  return (
    <div>
      <h1>Hello DenoLand!</h1>
      <button onClick={ increment }>Click the 🦕</button>
      <p>You clicked the 🦕 { count } times</p>
    </div>
  )
}

const App = () => (
  <Provider store={ store }>
    <Contents />
  </Provider>
)


export default App

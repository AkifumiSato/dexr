import Redux from 'https://dev.jspm.io/redux@4.0.5'

const { createStore, combineReducers } = Redux

type Action = {
  type: 'INCREMENT' | 'DECREMENT'
}

export type ClickState = {
  count: number
}

const initialState: ClickState = {
  count: 0
}

function clickCounter(clickState: ClickState = initialState, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...clickState,
        count: clickState.count + 1,
      }
    case 'DECREMENT':
      return {
        ...clickState,
        count: clickState.count - 1,
      }
    default:
      return clickState
  }
}

const root = combineReducers({ click: clickCounter })

export const store = createStore(root)

export type State = ReturnType<typeof root>

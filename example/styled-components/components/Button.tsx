// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'

import * as styledComponents from 'https://dev.jspm.io/styled-components@5.1.1'

const styled = styledComponents.default.default

const MyButton = styled.button`
  -webkit-appearance: none;
  border-radius: 3px;
  background-color: #fff;
  border: 3px solid tomato;
`

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<Props> = ({ onClick, children }) => <MyButton onClick={ onClick }>{ children }</MyButton>

// const Button: React.FC<Props> = ({ onClick, children }) => <button onClick={ onClick }>{ children }</button>

export default Button

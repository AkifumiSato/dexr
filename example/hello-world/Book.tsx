// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'

export type Props = {
  id: string
}

const Book: React.FC<Props> = ({ id }) => (
  <div>
    The book id is { id }
  </div>
)

export default Book
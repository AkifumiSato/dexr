import Layout from '../components/Layout.tsx'
import { React } from "../../../deps.ts";

export type Props = {
  id: string
  foo: string
}

const Book: React.FC<Props> = ({ id, foo }) => (
  <Layout>
    The book id is { id }<br/><br/>
    &foo is { foo }
  </Layout>
)

export default Book
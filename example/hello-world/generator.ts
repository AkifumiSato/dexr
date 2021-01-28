import { generate } from "../../mod2.tsx";
import { Props as BookProps } from "./pages/Book.tsx";

await generate("./pages/Index.tsx");
await generate<BookProps>("./pages/Book.tsx", {
  id: 'bar',
  foo: 'test foo!!!',
})

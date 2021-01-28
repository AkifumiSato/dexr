import { join } from "https://deno.land/std@0.84.0/path/mod.ts";
import { ensureDir, ensureFile } from "https://deno.land/std@0.84.0/fs/mod.ts";
import { React, renderToString } from './deps.ts'

const EXPORT_PATH = "public"

// todo add props
export const generate = async (componentPath: string) => {
  const fullPath = join(Deno.cwd(), componentPath)
  const Page = (await import(`file://${ fullPath }`)).default
  const html = renderToString(<Page />)

  // export
  await ensureDir(EXPORT_PATH)
  const fileName = componentPath.replace('.tsx', '.html')
  await ensureFile(`${EXPORT_PATH}/${fileName}`)
  await Deno.writeTextFile(`${EXPORT_PATH}/${fileName}`, html)
}

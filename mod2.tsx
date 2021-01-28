import { join } from "https://deno.land/std@0.84.0/path/mod.ts";
import { ensureDir, ensureFile } from "https://deno.land/std@0.84.0/fs/mod.ts";
import { React, renderToString } from "./deps.ts";

const EXPORT_PATH = "public";

export const generate = async <T extends {}>(
  componentPath: string,
  props: T = {} as T,
) => {
  const fullPath = join(Deno.cwd(), componentPath);
  const Page = (await import(`file://${fullPath}`)).default;
  const html = renderToString(<Page {...props} />);
  // todo hydrate script add
  // todo Deno.emitでbundleがサポートされる計画があるかissueなどあさってみる、SWCでサポートしない限り難しいのかも


  // export
  await ensureDir(EXPORT_PATH);
  const fileName = componentPath.replace(".tsx", ".html");
  await ensureFile(`${EXPORT_PATH}/${fileName}`);
  await Deno.writeTextFile(`${EXPORT_PATH}/${fileName}`, html);
};
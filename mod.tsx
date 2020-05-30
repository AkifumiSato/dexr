import { parse } from 'https://deno.land/std/flags/mod.ts'
import { startServer } from './server.ts'

const { args } = Deno
const { _: [subCommand] } = parse(args)

switch (subCommand) {
  case 'dev':
    startServer({ port: 8000 }).then(() => {
      console.log('serve: http://localhost:8000/')
    })
    break
  default:
    console.log('start default command')
}

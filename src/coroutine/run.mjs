import { start, Context } from './context'
import { Missing } from '../handler/missing-handler'

export const run = (continuation, handlers, program) =>
  start(new Context(continuation, {...Missing, ...handlers}, {}, program, program))

export const runPromise = (handlers, program) =>
  new Promise((resolve, reject) =>
    run({ return: resolve, throw: ({ key, value }) => reject(value) }, handlers, program))
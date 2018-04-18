// @flow
import type { Cancel, Step } from '../types'
import type { AsyncF, AsyncHandler } from '../effect/async'
import { Context } from '../context'

export const HandleAsync: AsyncHandler = {
  'forgefx/core/async/call': <H, A> (f: AsyncF<H, A>, step: Step<A>, context: Context<H>) =>
    callAsync(f, step, context),
  'forgefx/core/async/sleep': <H> (ms: number, step: Step<void>, context: Context<H>) =>
    callAsync(performDelay(ms), step, context)
}

const callAsync = <H, A> (f: AsyncF<H, A>, step: Step<A>, context: Context<H>) =>
  f(step, context)

const performDelay = (ms: number) => (step: Step<void>): Cancel =>
  new CancelTimer(setTimeout(onTimer, ms, step))

const onTimer = (step: Step<void>): void => step.next()

class CancelTimer implements Cancel {
  timer: any
  constructor (timer: any) {
    this.timer = timer
  }

  cancel (): void {
    clearTimeout(this.timer)
  }
}

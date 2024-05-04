import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import superjson from 'superjson'

const t = initTRPC.create({ isServer: true, transformer: superjson })

export const router = t.router({
  __ping__: t.procedure.input(z.object({ message: z.string() })).query((req) => {
    console.log('router ping pong', req.input.message)
    return {
      message: `pong ${req.input}!`
    }
  })
})
export const publicProcedure = t.procedure

export type AppRouter = typeof router

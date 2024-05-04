import { createTRPCProxyClient, createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../trpc/router'
import { ipcLink } from 'electron-trpc/renderer'
import superjson from 'superjson'

export const reactTrpcClient = createTRPCReact<AppRouter>()
export const vanillaTrpcClient = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
  transformer: superjson
})

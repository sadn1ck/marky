import { createTRPCProxyClient, createTRPCReact } from '@trpc/react-query'
import { ipcLink } from 'electron-trpc/renderer'
import type { AppRouter } from '../../../api/router'

export const reactTrpcClient = createTRPCReact<AppRouter>()
export const vanillaTrpcClient = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()]
})

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../api/router'

export const reactTrpcClient = createTRPCReact<AppRouter>()

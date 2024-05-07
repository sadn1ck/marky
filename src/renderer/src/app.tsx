import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ipcLink } from 'electron-trpc/renderer'
import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { BaseLayout } from './layouts/Base'
import { bootstrapControllerContext } from './state/bootstrap'
import { reactTrpcClient } from './trpc/client'
import { ContentArea } from './components/ContentArea'

export function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    reactTrpcClient.createClient({
      links: [ipcLink()]
    })
  )
  return (
    <bootstrapControllerContext.Provider>
      <reactTrpcClient.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {/* <Content /> */}
          <BaseLayout Sidebar={<Sidebar />} ContentArea={<ContentArea />}></BaseLayout>
        </QueryClientProvider>
      </reactTrpcClient.Provider>
    </bootstrapControllerContext.Provider>
  )
}

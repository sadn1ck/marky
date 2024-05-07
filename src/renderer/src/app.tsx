import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ipcLink } from 'electron-trpc/renderer'
import { useState } from 'react'
import { reactTrpcClient, vanillaTrpcClient } from './trpc/client'
import { Editor } from './components/Editor'

const defaultContent = await vanillaTrpcClient.openFile.query({
  path: '/Users/anik/Documents/Writing/WORKNOTES.md'
})

export const Content = () => {
  return (
    <>
      <Editor content={defaultContent} />
    </>
  )
}

export function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    reactTrpcClient.createClient({
      links: [ipcLink()]
    })
  )
  return (
    <reactTrpcClient.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Content />
      </QueryClientProvider>
    </reactTrpcClient.Provider>
  )
}

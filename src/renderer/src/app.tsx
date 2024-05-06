import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ipcLink } from 'electron-trpc/renderer'
import { useState } from 'react'
import { reactTrpcClient, vanillaTrpcClient } from './trpc/client'

export const Content = () => {
  const [currentFile, setCurrentFile] = useState('')
  const [fileList, setFileList] = useState([] as { type: string; name: string; fullPath: string }[])
  return (
    <section className="flex h-screen">
      {/* file list component */}
      <ul className=" min-w-[220px] border border-border p-4">
        <li className="bg-background/35 hover:bg-background/85 p-2 rounded-lg">
          <button
            onClick={async () => {
              const files = await vanillaTrpcClient.showDirectoryPicker.query()
              // ^?
              console.log(files)
              if (files && !files.cancelled) {
                setFileList(files!.list)
                const fileContent = await vanillaTrpcClient.openFile.query({
                  path: files!.list[0].fullPath
                })
                setCurrentFile(fileContent ?? '')
              }
            }}
          >
            Open directory
          </button>
        </li>
        <br />
        {fileList.map((file) => (
          <li key={file.fullPath}>
            <button
              onClick={async () => {
                const fileContent = await vanillaTrpcClient.openFile.query({
                  path: file.fullPath
                })
                setCurrentFile(fileContent ?? '')
              }}
            >
              {file.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-4 h-full overflow-y-scroll flex-grow">
        <pre style={{ fontFamily: 'CommitMono Nerd Font' }} className="max-w-full">
          {currentFile}
        </pre>
      </div>
    </section>
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

import { useState } from 'react'

export const App = () => {
  const [currentFile, setCurrentFile] = useState('')
  const [fileList, setFileList] = useState([] as { type: string; path: string; name: string }[])
  return (
    <section className="flex h-screen">
      {/* <h1>Marky</h1>

      <section>{state}</section> */}
      {/* file list component */}
      <ul className=" min-w-[220px] border border-border p-4">
        <li className="bg-background/35 hover:bg-neutral-800 p-2 rounded-lg">
          <button
            onClick={async () => {
              const result = await window.electron.ipcRenderer.invoke('open-folder')
              console.log(result)
              setFileList(result.children?.filter((child) => child.type !== 'directory') || [])
              const fileContent = await window.electron.ipcRenderer.invoke('open-file', {
                file: result.children?.filter((child) => child.type === 'file')[0]
              })
              console.log(fileContent)
              setCurrentFile(fileContent)
            }}
          >
            Open directory
          </button>
        </li>
        <br />
        {fileList.map((file) => (
          <li key={file.path}>
            <button
              onClick={async () => {
                const fileContent = await window.electron.ipcRenderer.invoke('open-file', {
                  file
                })
                console.log(fileContent)
                setCurrentFile(fileContent)
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

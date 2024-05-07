import { useSelector } from '@xstate/react'
import type { MarkyFile } from '../../../../types'
import { useBootstrapChildren } from '../../hooks/use-bootstrap-children'
import { reactTrpcClient } from '../../trpc/client'
import { Editor } from '../Editor'

const ContentWrapper = ({ file }: { file: MarkyFile }) => {
  const { data, isLoading } = reactTrpcClient.openFile.useQuery(
    { path: file.fullPath },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      notifyOnChangeProps: ['data', 'isLoading']
    }
  )
  console.log('content::', file.name, { isLoading })
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <>
      <Editor key={file.fullPath + data} initialContent={data!} path={file.fullPath} />
    </>
  )
}

export const ContentArea = () => {
  const { filesController } = useBootstrapChildren()
  const [currentFile] = useSelector(filesController, (s) => [s?.context.currentFile ?? null])

  switch (currentFile) {
    case null:
      return <div>Please select a file or open a file</div>
    default:
      return <ContentWrapper file={currentFile} />
  }
}

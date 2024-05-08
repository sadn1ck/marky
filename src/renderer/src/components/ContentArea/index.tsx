import { useSelector } from '@xstate/react'
import type { MarkyFile } from '../../../../types'
import { useBootstrapChildren } from '../../hooks/use-bootstrap-children'
import { reactTrpcClient } from '../../trpc/client'
import { Editor } from '../Editor'
import { useEffect } from 'react'
import { NoFileOpened } from './no-file-opened'
import { MarkdownLoading } from './loading'

const ContentWrapper = ({ file }: { file: MarkyFile }) => {
  const { data, isLoading } = reactTrpcClient.openFileContents.useQuery(
    { path: file.fullPath },
    {
      refetchOnWindowFocus: false
    }
  )

  if (isLoading) {
    return <MarkdownLoading />
  }
  return (
    <>
      <Editor key={data} initialContent={data!} path={file.fullPath} />
    </>
  )
}

export const ContentArea = () => {
  const { filesController } = useBootstrapChildren()
  const [currentFile] = useSelector(filesController, (s) => [s?.context.currentFile ?? null])

  useEffect(() => {
    document.title = currentFile?.name ? `${currentFile.name} - Marky` : 'Marky'
  }, [currentFile])

  switch (currentFile) {
    case null:
      return <NoFileOpened />
    default:
      return <ContentWrapper file={currentFile} />
  }
}

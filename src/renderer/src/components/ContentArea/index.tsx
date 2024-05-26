import { useSelector } from '@xstate/react'
import type { MarkyFile } from '../../../../types'
import { useBootstrapChildren } from '../../hooks/use-bootstrap-children'
import { reactTrpcClient } from '../../trpc/client'
import { Editor } from '../Editor'
import { useEffect } from 'react'
import { NoFileOpened } from './no-file-opened'
import { MarkdownLoading } from './loading'

const ContentWrapper = ({ file }: { file: MarkyFile }) => {
  const utils = reactTrpcClient.useUtils()
  const { data, isLoading } = reactTrpcClient.openFileContents.useQuery(
    { path: file.fullPath },
    {
      refetchOnWindowFocus: false,
      queryKey: ['openFileContents', { path: file.fullPath }],
      onSuccess() {
        console.log('openFileContents.query')
      }
    }
  )
  const { mutate } = reactTrpcClient.saveFileContents.useMutation({
    onSuccess(data, variables, context) {
      console.log('saveFileContents.mutation::', data, variables, context)
      utils.openFileContents.invalidate()
    }
  })

  if (isLoading) {
    return <MarkdownLoading />
  }
  return (
    <>
      <Editor
        key={file.fullPath}
        initialContent={data!}
        path={file.fullPath}
        onSave={({ content, path }) => {
          mutate({
            content,
            path
          })
        }}
      />
    </>
  )
}

export const ContentArea = () => {
  const { filesController } = useBootstrapChildren()
  const [currentFile] = useSelector(filesController, (s) => [s?.context?.currentFile ?? null])

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

import type { EditorView } from '@codemirror/view'
import { useSelector } from '@xstate/react'
import { useEffect } from 'react'
import type { MarkyFile } from '../../../../types'
import { useBootstrapChildren } from '../../hooks/use-bootstrap-children'
import { reactTrpcClient, vanillaTrpcClient } from '../../trpc/client'
import { MarkdownEditor } from '../Editor/MarkdownEditor'
import { MarkdownLoading } from './loading'
import { NoFileOpened } from './no-file-opened'

const onSave = (path: string) => async (view: EditorView) => {
  const markdown = view.state.sliceDoc()
  await vanillaTrpcClient.saveFileContents.mutate({
    path: path,
    content: markdown
  })
}

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
      <MarkdownEditor onSave={onSave(file.fullPath)} key={data!} doc={{ content: data! }} />
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

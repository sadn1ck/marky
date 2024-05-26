import { $useKeymap, getMarkdown } from '@milkdown/utils'

type Input = {
  SaveFileContent: {
    path: string
    onSave: ({ path, content }: { path: string; content: string }) => void
  }
}
export const extraKeymaps = ({ SaveFileContent }: Input) =>
  $useKeymap('extraTableKeymap', {
    SaveFileContent: {
      shortcuts: ['Mod-s', 'Ctrl-s'],
      command: (ctx) => {
        return () => {
          const markdown = getMarkdown()?.(ctx)
          SaveFileContent.onSave({ path: SaveFileContent.path, content: markdown })
          return true
        }
      }
    }
  })

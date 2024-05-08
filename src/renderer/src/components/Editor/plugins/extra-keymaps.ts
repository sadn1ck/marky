// import { commandsCtx } from '@milkdown/core'
// import { addColAfterCommand, addRowAfterCommand } from '@milkdown/preset-gfm'
import { $useKeymap, getMarkdown } from '@milkdown/utils'
import { vanillaTrpcClient } from '../../../trpc/client'

type Input = {
  SaveFileContent: {
    path: string
  }
}
export const extraKeymaps = ({ SaveFileContent }: Input) =>
  $useKeymap('extraTableKeymap', {
    // NewRowAfter: {
    //   shortcuts: 'Mod-Enter',
    //   command: (ctx) => {
    //     const commands = ctx.get(commandsCtx)
    //     return () => commands.call(addRowAfterCommand.key)
    //   }
    // },
    // NewColAfter: {
    //   shortcuts: 'Mod-Shift-Enter',
    //   command: (ctx) => {
    //     const commands = ctx.get(commandsCtx)
    //     return () => commands.call(addColAfterCommand.key)
    //   }
    // },
    SaveFileContent: {
      shortcuts: ['Mod-s', 'Ctrl-s'],
      command: (ctx) => {
        return () => {
          const markdown = getMarkdown()?.(ctx)
          console.log('saving::', SaveFileContent.path)

          vanillaTrpcClient.saveFileContents.mutate({
            path: SaveFileContent.path,
            content: markdown
          })
          return true
        }
      }
    }
  })

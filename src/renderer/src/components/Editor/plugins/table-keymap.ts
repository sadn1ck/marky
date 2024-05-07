import { commandsCtx } from '@milkdown/core'
import { addColAfterCommand, addRowAfterCommand } from '@milkdown/preset-gfm'
import { $useKeymap } from '@milkdown/utils'

export const extraTableKeymap = $useKeymap('extraTableKeymap', {
  NewRowAfter: {
    shortcuts: 'Mod-Enter',
    command: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return () => commands.call(addRowAfterCommand.key)
    }
  },
  NewColAfter: {
    shortcuts: 'Mod-Shift-Enter',
    command: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return () => commands.call(addColAfterCommand.key)
    }
  }
})

import { Editor as RootEditor, defaultValueCtx, rootCtx } from '@milkdown/core'
import { clipboard } from '@milkdown/plugin-clipboard'
import { history, historyKeymap } from '@milkdown/plugin-history'
import { trailing } from '@milkdown/plugin-trailing'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { customTheme } from './plugins/custom-theme'
import { milkShiki } from './plugins/shiki'

import './editor.css'
import './table.css'
import { extraTableKeymap } from './plugins/table-keymap'

type Props = {
  content: string
}

export const MilkdownEditor = (props: Props) => {
  useEditor((root) => {
    return RootEditor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, props.content)
        ctx.set(historyKeymap.key, {
          // Remap to one shortcut.
          Undo: 'Mod-z',
          // Remap to multiple shortcuts.
          Redo: ['Mod-y', 'Shift-Mod-z']
        })
      })
      .config(customTheme)
      .use(extraTableKeymap)
      .use(clipboard)
      .use(history)
      .use(commonmark)
      .use(gfm)
      .use(trailing)
      .use(milkShiki)
  }, [])

  return <Milkdown />
}

export const Editor = (props: Props) => {
  return (
    <MilkdownProvider>
      <MilkdownEditor content={props.content} />
    </MilkdownProvider>
  )
}

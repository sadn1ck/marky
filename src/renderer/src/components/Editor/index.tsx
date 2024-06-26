import { Editor as RootEditor, defaultValueCtx, rootCtx } from '@milkdown/core'
import { clipboard } from '@milkdown/plugin-clipboard'
import { history } from '@milkdown/plugin-history'
import { trailing, trailingConfig } from '@milkdown/plugin-trailing'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { automd } from '@milkdown/plugin-automd'
import { customTheme } from './plugins/custom-theme'
import { extraKeymaps } from './plugins/extra-keymaps'
import { milkShiki } from './plugins/shiki'

import './editor.css'
import './table.css'

type Props = {
  initialContent: string
  path: string
  onSave: ({ path, content }: { path: string; content: string }) => void
}

export const MilkdownEditor = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEditor((root) => {
    return RootEditor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, props.initialContent)
      })
      .use(
        extraKeymaps({
          SaveFileContent: {
            path: props.path,
            onSave: props.onSave
          }
        })
      )
      .use(clipboard)
      .use(history)
      .use(commonmark)
      .use(gfm)
      .use(automd)
      .use(trailing)
      .config((ctx) => {
        const prev = ctx.get(trailingConfig.key)
        ctx.set(trailingConfig.key, {
          ...prev,
          shouldAppend: (lastNode) => {
            if (!lastNode) return false
            if (lastNode.textContent.trim().length === 0) return false
            return true
          }
        })
      })
      .use(milkShiki)
      .config(customTheme)
      .enableInspector(true)
  }, [])

  return <Milkdown />
}

export const Editor = (props: Props) => {
  return (
    <MilkdownProvider>
      <MilkdownEditor {...props} />
    </MilkdownProvider>
  )
}

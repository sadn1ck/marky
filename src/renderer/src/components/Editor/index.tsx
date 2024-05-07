import { Editor as RootEditor, defaultValueCtx, rootCtx } from '@milkdown/core'
import { clipboard } from '@milkdown/plugin-clipboard'
import { history } from '@milkdown/plugin-history'
import { trailing } from '@milkdown/plugin-trailing'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { customTheme } from './plugins/custom-theme'
import { extraKeymaps } from './plugins/extra-keymaps'
import { milkShiki } from './plugins/shiki'

import './editor.css'
import './table.css'

type Props = {
  initialContent: string
  path: string
}

export const MilkdownEditor = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editor = useEditor((root) => {
    return RootEditor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, props.initialContent)
      })
      .use(
        extraKeymaps({
          SaveFileContent: {
            path: props.path
          }
        })
      )
      .use(clipboard)
      .use(history)
      .use(commonmark)
      .use(gfm)
      .use(trailing)
      .use(milkShiki)
      .config(customTheme)
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

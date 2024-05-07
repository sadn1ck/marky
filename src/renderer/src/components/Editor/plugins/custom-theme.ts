import { editorViewOptionsCtx } from '@milkdown/core'
import type { Ctx } from '@milkdown/ctx'
import clsx from 'clsx'

export function customTheme(ctx: Ctx): void {
  ctx.update(editorViewOptionsCtx, (prev) => {
    const prevClass = prev.attributes
    return {
      ...prev,
      attributes: (state) => {
        const attrs = typeof prevClass === 'function' ? prevClass(state) : prevClass

        return {
          ...attrs,
          class: clsx('px-2 outline-none whitespace-pre-wrap', attrs?.class || ''),
          spellcheck: 'false'
        }
      }
    }
  })
}

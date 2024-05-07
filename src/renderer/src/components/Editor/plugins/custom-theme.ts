/* Copyright 2021, Milkdown by Mirone. */
import { editorViewOptionsCtx } from '@milkdown/core'
import type { Ctx } from '@milkdown/ctx'
import clsx from 'clsx'

// TODO fix when adding tables
// import '@milkdown/prose/view/style/prosemirror.css'
// import './style.css'

export function customTheme(ctx: Ctx): void {
  ctx.update(editorViewOptionsCtx, (prev) => {
    const prevClass = prev.attributes
    return {
      ...prev,
      attributes: (state) => {
        const attrs = typeof prevClass === 'function' ? prevClass(state) : prevClass

        return {
          ...attrs,
          class: clsx('outline-none whitespace-pre-wrap', attrs?.class || ''),
          spellcheck: 'false'
        }
      }
    }
  })
}

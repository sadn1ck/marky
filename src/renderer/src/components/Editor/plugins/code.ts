import type { Range } from '@codemirror/state'
import type { DecorationSet, EditorView, ViewUpdate } from '@codemirror/view'
import { Decoration, ViewPlugin } from '@codemirror/view'

const CODE_BLOCK_REGEX = /```(\w+)\n(.*?)\n```/gs
const INLINE_CODE_REGEX = /(?<!```[\s\S]*?)`(.*?)`/g

function getCodeDecorations(view: EditorView) {
  const decorations: Range<Decoration>[] = []
  const text = view.state.doc.sliceString(0)
  const codeBlockMatches = text.matchAll(CODE_BLOCK_REGEX)

  for (const match of codeBlockMatches) {
    const position = match.index
    decorations.push(
      Decoration.mark({
        class: 'font-mono text-sm text-left inline-block'
      }).range(position, position + match[0].length)
    )
  }

  const inlineCodeBlockMatches = text.matchAll(INLINE_CODE_REGEX)
  for (const match of inlineCodeBlockMatches) {
    const position = match.index
    decorations.push(
      Decoration.mark({
        class:
          'font-mono text-sm bg-[rgba(var(--accent-color),0.35)] rounded-md outline-accent px-0.5 py-0.5 mx-0.5'
      }).range(position, position + match[0].length)
    )
  }

  return Decoration.set(decorations.sort((range1, range2) => range1.from - range2.from))
}

export const codeMonospacePlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = getCodeDecorations(view)
    }

    update({ docChanged, viewportChanged, view }: ViewUpdate) {
      if (docChanged || viewportChanged) {
        this.decorations = getCodeDecorations(view)
      }
    }
  },
  {
    decorations: (v) => v.decorations
  }
)

import { BundledTheme, getHighlighter, Highlighter } from 'shiki'
import { $proseAsync } from '@milkdown/utils'
import { Node } from '@milkdown/prose/model'
import { Plugin, PluginKey } from '@milkdown/prose/state'
import { Decoration, DecorationSet } from '@milkdown/prose/view'
import { findChildren } from '@milkdown/prose'
import { codeBlockSchema } from '@milkdown/preset-commonmark'
import { Ctx } from '@milkdown/ctx'

const DARK_THEME: BundledTheme = 'vitesse-dark'
const LIGHT_THEME: BundledTheme = 'vitesse-light'

function getDecorations(doc: Node, highlighter: Highlighter, ctx: Ctx) {
  const decorations: Decoration[] = []

  const children = findChildren((node) => node.type === codeBlockSchema.type(ctx))(doc)

  children.forEach(async (block) => {
    let from = block.pos + 1
    const { language } = block.node.attrs
    if (!language) return
    const nodes = highlighter.codeToTokens(block.node.textContent, {
      lang: language,
      themes: {
        dark: DARK_THEME,
        light: LIGHT_THEME
      }
    }).tokens

    console.log(nodes)
    nodes.forEach((block) => {
      block.forEach((node) => {
        const to = from + node.content.length
        const decoration = Decoration.inline(from, to, {
          style: node.htmlStyle
        })
        decorations.push(decoration)
        from = to
      })
      from += 1
    })
  })

  return DecorationSet.create(doc, decorations)
}

export const milkShiki = $proseAsync(async (ctx) => {
  const highlighter = await getHighlighter({
    langs: [
      'js',
      'ts',
      'tsx',
      'jsx',
      'go',
      'elixir',
      'python',
      'json',
      'json5',
      'jsonc',
      'yaml',
      'css',
      'postcss',
      'html',
      'plaintext'
    ],
    themes: [LIGHT_THEME, DARK_THEME]
  })
  await highlighter.loadTheme(LIGHT_THEME)
  await highlighter.loadTheme(DARK_THEME)
  const key = new PluginKey('shiki')

  return new Plugin({
    key,
    state: {
      init: (_, { doc }) => getDecorations(doc, highlighter, ctx),
      apply: (tr, value, oldState, newState) => {
        const codeBlockType = codeBlockSchema.type(ctx)
        const isNodeName = newState.selection.$head.parent.type === codeBlockType
        const isPreviousNodeName = oldState.selection.$head.parent.type === codeBlockType
        const oldNode = findChildren((node) => node.type === codeBlockType)(oldState.doc)
        const newNode = findChildren((node) => node.type === codeBlockType)(newState.doc)

        const codeBlockChanged =
          tr.docChanged &&
          (isNodeName ||
            isPreviousNodeName ||
            oldNode.length !== newNode.length ||
            oldNode[0]?.node.attrs.language !== newNode[0]?.node.attrs.language)

        if (codeBlockChanged) {
          return getDecorations(tr.doc, highlighter, ctx)
        }

        return value.map(tr.mapping, tr.doc)
      }
    },
    props: {
      decorations(state) {
        return key.getState(state)
      }
    }
  })
})

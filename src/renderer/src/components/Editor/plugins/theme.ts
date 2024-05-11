import { HighlightStyle } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags } from '@lezer/highlight'

const editorStyles = {
  '&': {},
  '&.cm-editor.cm-focused': {
    outline: 'none'
  },
  '&.cm-editor': {
    height: '100%',
    maxWidth: '720px',
    margin: '0 auto !important',
    textRendering: 'optimizeLegibility',
    display: 'flex',
    flexDirection: 'column'
  },
  '.cm-scroller': {
    height: '100%'
  },
  '.cm-gutters': {
    display: 'none'
  },
  '.cm-content': {
    height: '100%',
    fontFamily: '"Public Sans", serif',
    lineHeight: '24px',
    caretColor: 'rgb(var(--text)) !important'
  },
  '.cm-content li': {
    marginBottom: 0
  },
  '.frontmatter': {
    fontFamily: 'var(--monospace-font) !important',
    fontSize: '90%',
    textDecoration: 'none',
    fontWeight: 'normal'
  }
}

export const markdownEditorTheme = EditorView.theme(editorStyles)

const baseHeadingStyles = {
  fontFamily: 'var(--font-sans) !important',
  fontWeight: 'bold',
  textDecoration: 'none'
}

const baseCodeStyles = {
  fontSize: '14px',
  fontFamily: 'var(--monospace-font) !important'
}

export const markdownStyles = HighlightStyle.define([
  {
    tag: tags.heading1,
    ...baseHeadingStyles,
    fontSize: '1.5rem',
    lineHeight: '2rem',
    marginBottom: '1rem',
    marginTop: '2rem'
  },
  {
    tag: tags.heading2,
    ...baseHeadingStyles,
    fontSize: '1.5rem',
    lineHeight: '2rem',
    marginBottom: '1rem',
    marginTop: '2rem'
  },
  {
    tag: tags.heading3,
    ...baseHeadingStyles,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    marginBottom: '1rem',
    marginTop: '2rem'
  },
  {
    tag: tags.heading4,
    ...baseHeadingStyles,
    fontSize: '1.1rem',
    marginBottom: '1rem',
    marginTop: '2rem'
  },
  {
    tag: tags.comment,
    color: '#555'
    // fontFamily: 'monospace'
  },
  {
    tag: tags.strong,
    fontWeight: 'bold'
  },
  {
    tag: tags.emphasis,
    fontStyle: 'italic'
  },
  {
    tag: tags.strikethrough,
    textDecoration: 'line-through'
  },
  {
    tag: [tags.meta],
    fontWeight: 300,
    color: 'rgba(var(--accent-color), 0.75)',
    fontVariantNumeric: 'tabular-nums'
  },
  { tag: tags.keyword, ...baseCodeStyles, color: '#708' },
  {
    tag: [tags.atom, tags.bool, tags.contentSeparator, tags.labelName],
    ...baseCodeStyles,
    color: 'rgb(var(--accent-color))'
  },
  // { tag: [tags.literal, tags.inserted], ...baseCodeStyles, color: '#164' },
  { tag: [tags.string, tags.deleted], ...baseCodeStyles, color: '#5f67b5' },
  {
    tag: [tags.regexp, tags.escape, tags.special(tags.string)],
    ...baseCodeStyles,
    color: '#e40'
  },
  { tag: tags.definition(tags.variableName), ...baseCodeStyles, color: '#00f' },
  { tag: tags.local(tags.variableName), ...baseCodeStyles, color: '#30a' },
  { tag: [tags.typeName, tags.namespace], ...baseCodeStyles, color: '#085' },
  { tag: tags.className, ...baseCodeStyles, color: '#167' },
  {
    tag: [tags.special(tags.variableName), tags.macroName],
    ...baseCodeStyles,
    color: '#256'
  },
  { tag: tags.definition(tags.propertyName), ...baseCodeStyles, color: '#00c' },
  { tag: tags.quote, color: 'rgb(var(--text-secondary))', fontStyle: 'italic' }
])

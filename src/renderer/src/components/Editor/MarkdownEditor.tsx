// Thanks to https://github.com/inkandswitch/tiny-essay-editor/tree/main/src/tee

import { completionKeymap } from '@codemirror/autocomplete'
import { history, historyKeymap, indentWithTab, standardKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { foldKeymap, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { lintKeymap } from '@codemirror/lint'
import { searchKeymap } from '@codemirror/search'
import { EditorView, keymap } from '@codemirror/view'
import { useEffect, useRef, useState } from 'react'
import { codeMonospacePlugin } from './plugins/code'
import { frontmatterPlugin } from './plugins/frontmatter'
import { lineWrappingPlugin } from './plugins/line-wrap'
import { markdownEditorTheme, markdownStyles } from './plugins/theme'

export type EditorProps = {
  doc: { content: string }
  onSave: (view: EditorView) => Promise<void>
}

export function MarkdownEditor({ doc, onSave }: EditorProps) {
  const containerRef = useRef(null)
  const editorRoot = useRef<EditorView | null>(null)
  const [editorCrashed, setEditorCrashed] = useState<boolean>(false)

  useEffect(() => {
    const source = doc.content // this should use path
    const view = new EditorView({
      doc: source,
      extensions: [
        history(),
        indentOnInput(),
        keymap.of([
          ...standardKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
          indentWithTab
        ]),
        EditorView.lineWrapping,
        markdownEditorTheme,
        markdown({
          codeLanguages: languages,
          base: markdownLanguage
        }),
        indentUnit.of('    '),
        syntaxHighlighting(markdownStyles),
        frontmatterPlugin,
        codeMonospacePlugin,
        lineWrappingPlugin
      ],
      dispatch(transaction, view) {
        try {
          view.update([transaction])
        } catch (e) {
          console.error(
            'Encountered an error in dispatch function; crashing the editor to notify the user and avoid data loss.'
          )
          console.error(e)
          setEditorCrashed(true)
          editorRoot.current?.destroy()
        }
      },
      parent: containerRef.current!
    })

    editorRoot.current = view
    view.focus()

    return () => {
      view.destroy()
    }
  }, [])

  if (editorCrashed) {
    return (
      <div className="bg-red-100 p-4 rounded-md">
        <p className="mb-2">⛔️ Error: editor crashed!</p>
        {import.meta.env.MODE === 'development' && (
          <p className="mb-2">Probably due to hot reload in dev.</p>
        )}
        <p className="mb-2">
          Were sorry for the inconvenience. Please reload to keep working. Your data was most likely
          saved before the crash.
        </p>
        <p className="mb-2">If youd like you can screenshot the dev console as a bug report.</p>
      </div>
    )
  }

  return (
    <div
      className="codemirror-editor flex-grow relative min-h-screen"
      ref={containerRef}
      onKeyDown={(evt) => {
        // handle somewhere else

        if (evt.key === 's' && (evt.metaKey || evt.ctrlKey)) {
          onSave(editorRoot.current!)
          return
        }
        // Let cmd-\ thru for toggling the sidebar
        if (evt.key === 'p' && (evt.metaKey || evt.ctrlKey)) {
          return
        }
        if (evt.key === 'Escape') {
          editorRoot.current?.contentDOM?.blur()
          return
        }
        evt.stopPropagation()
      }}
    />
  )
}

// const loadFile = (file: File): Promise<Uint8Array> => {
//   return new Promise((resolve) => {
//     const reader = new FileReader()
//     reader.onload = function (e) {
//       // The file's text will be printed here
//       const arrayBuffer = e.target.result as ArrayBuffer

//       // Convert the arrayBuffer to a Uint8Array
//       resolve(new Uint8Array(arrayBuffer))
//     }

//     reader.readAsArrayBuffer(file)
//   })
// }

// const isSupportedImageFile = (file: File) => {
//   switch (file.type) {
//     case 'image/png':
//     case 'image/jpeg':
//     case 'image/gif':
//     case 'image/webp':
//     case 'image/bmp':
//     case 'image/tiff':
//       return true

//     default:
//       return false
//   }
// }

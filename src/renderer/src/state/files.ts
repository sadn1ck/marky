import { type ActorRefFrom, assign, setup } from 'xstate'
import type { MarkyFile } from '../../../types'

const filesController = setup({
  types: {
    context: {
      files: [] as MarkyFile[],
      lastOpenedFile: null as MarkyFile | null,
      currentFile: null as MarkyFile | null
    },
    events: {} as
      | {
          type: 'open.file'
          payload: {
            file: MarkyFile
          }
        }
      | {
          type: 'remove.file'
          payload: {
            file: MarkyFile
          }
        }
      | {
          type: 'add.files'
          payload: {
            files: MarkyFile[]
          }
        }
  }
}).createMachine({
  context: {
    files: [],
    lastOpenedFile: null,
    currentFile: null
  },
  type: 'parallel',
  states: {
    files: {
      on: {
        'add.files': {
          actions: [
            assign({
              files: ({ context, event }) => [...context.files, ...event.payload.files]
            })
          ]
        },
        'open.file': {
          actions: [
            assign({
              currentFile: ({ event }) => event.payload.file,
              lastOpenedFile: ({ event }) => event.payload.file
            })
          ]
        },
        'remove.file': {
          actions: [
            assign({
              files: ({ context, event }) =>
                context.files.filter((file) => file.fullPath !== event.payload.file.fullPath),
              currentFile: null
            })
          ]
        }
      }
    }
  }
})

export { filesController }

export type FilesControllerRef = ActorRefFrom<typeof filesController>

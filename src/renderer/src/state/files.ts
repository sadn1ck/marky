import { type ActorRefFrom, assign, setup } from 'xstate'
import type { MarkyFile, Persisted } from '../../../types'
import { MARKY_APP_KEY } from '../../../shared/utils'

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
  },
  actions: {
    syncToLocalStorage: ({ context }) => {
      const persist: Persisted<typeof context> = {
        lastStoreAt: Date.now(),
        data: context
      }
      localStorage.setItem(MARKY_APP_KEY, JSON.stringify(persist))
    }
  }
}).createMachine({
  context: {
    files: [],
    lastOpenedFile: null,
    currentFile: null
  },
  initial: 'setup',
  states: {
    setup: {
      entry: [
        assign(({ context }) => {
          const stored = localStorage.getItem(MARKY_APP_KEY)!
          if (!stored) return context
          const { data, lastStoreAt } = JSON.parse(stored) as Persisted<typeof context>
          console.log(`files::`, data, lastStoreAt)
          if (lastStoreAt < Date.now()) {
            return {
              ...data
            }
          } else return context
        })
      ],
      after: {
        1: {
          target: 'ready'
        }
      }
    },
    ready: {
      type: 'parallel',
      states: {
        files: {
          on: {
            'add.files': {
              actions: [
                assign({
                  files: ({ context, event }) => [...context.files, ...event.payload.files]
                }),
                'syncToLocalStorage'
              ]
            },
            'open.file': {
              actions: [
                assign({
                  currentFile: ({ event }) => event.payload.file,
                  lastOpenedFile: ({ event }) => event.payload.file
                }),
                'syncToLocalStorage'
              ]
            },
            'remove.file': {
              actions: [
                assign({
                  files: ({ context, event }) =>
                    context.files.filter((file) => file.fullPath !== event.payload.file.fullPath),
                  currentFile: null
                }),
                'syncToLocalStorage'
              ]
            }
          }
        }
      }
    }
  }
})

export { filesController }

export type FilesControllerRef = ActorRefFrom<typeof filesController>

import { createActorContext } from '@xstate/react'
import { setup } from 'xstate'
import { filesController } from './files'
import { layoutController } from './layout'

const bootstrapController = setup({
  actors: {
    filesController,
    layoutController
  },
  types: {
    children: {} as { filesController: 'filesController'; layoutController: 'layoutController' }
  }
}).createMachine({
  initial: 'startup',
  states: {
    startup: {
      after: {
        1: 'ready'
      }
    },
    ready: {
      invoke: [
        {
          id: 'layoutController',
          src: 'layoutController'
        },
        {
          id: 'filesController',
          src: 'filesController'
        }
      ]
    }
  }
})
export const bootstrapControllerContext = createActorContext(bootstrapController, {
  systemId: 'bootstrap',
  id: 'bootstrap'
})

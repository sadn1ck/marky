import { type ActorRefFrom, setup } from 'xstate'

export const layoutController = setup({
  types: {
    events: {} as {
      type: 'layout.sidebar.toggle'
    }
  }
}).createMachine({
  type: 'parallel',
  states: {
    sidebar: {
      initial: 'open',
      states: {
        open: {
          on: {
            'layout.sidebar.toggle': {
              target: 'closed'
            }
          }
        },
        closed: {
          on: {
            'layout.sidebar.toggle': {
              target: 'open'
            }
          }
        }
      }
    }
  }
})

export type LayoutControllerRef = ActorRefFrom<typeof layoutController>

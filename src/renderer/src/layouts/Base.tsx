import { shallowEqual, useSelector } from '@xstate/react'
import { clsx } from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import { useBootstrapChildren } from '../hooks/use-bootstrap-children'
import { vanillaTrpcClient } from '../trpc/client'

const BaseLayout = (props: { Sidebar: React.ReactNode; ContentArea: React.ReactNode }) => {
  const { layoutController, filesController } = useBootstrapChildren()
  const [isSidebarOpen] = useSelector(
    layoutController,
    (s) => [s?.matches({ sidebar: 'open' }) ?? true],
    shallowEqual
  )

  useHotkeys(
    'mod+p',
    () => {
      layoutController?.send({ type: 'layout.sidebar.toggle' })
    },
    {},
    [layoutController]
  )

  useHotkeys(
    'mod+o',
    async () => {
      if (!filesController) {
        console.error('missing filescontroller')
        return
      }
      const result = await vanillaTrpcClient.selectFiles.query()
      if (!result.cancelled) {
        console.log(result)
        filesController?.send({
          type: 'add.files',
          payload: {
            files: result.list
          }
        })
      }
    },
    [filesController]
  )

  return (
    <div className={clsx('flex h-screen')}>
      <div>
        <aside
          data-state={isSidebarOpen ? 'open' : 'closed'}
          className={clsx(
            'fixed w-[244px] h-full',
            'transition-transform duration-150 ease-out',
            'data-[state=open]:translate-x-0 data-[state=open]:translate-y-0',
            'data-[state=closed]:translate-y-4 data-[state=closed]:-translate-x-full'
          )}
        >
          {props.Sidebar}
        </aside>
        <div
          data-state={isSidebarOpen ? 'open' : 'closed'}
          className={clsx(
            'w-[244px] h-full',
            'transition-[width] duration-150 ease-out',
            'data-[state=open]:w-[244px] data-[state=closed]:w-0',
            'border-2 border-red-500'
          )}
        >
          {isSidebarOpen}
        </div>
      </div>
      <section className={clsx('grow overflow-y-scroll overflow-x-auto min-w-0')}>
        {props.ContentArea}
      </section>
    </div>
  )
}

export { BaseLayout }
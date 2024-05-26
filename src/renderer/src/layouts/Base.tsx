import { shallowEqual, useSelector } from '@xstate/react'
import { clsx } from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import { useBootstrapChildren } from '../hooks/use-bootstrap-children'
import { reactTrpcClient } from '../trpc/client'

const BaseLayout = (props: { Sidebar: React.ReactNode; ContentArea: React.ReactNode }) => {
  const { layoutController, filesController } = useBootstrapChildren()
  const [isSidebarOpen] = useSelector(
    layoutController,
    (s) => [s?.matches({ sidebar: 'open' }) ?? true],
    shallowEqual
  )
  const { refetch, data, isLoading } = reactTrpcClient.selectFilesToOpen.useQuery(undefined, {
    enabled: false
  })

  useHotkeys(
    'mod+o',
    async () => {
      if (!filesController) {
        console.error('missing filescontroller')
        return
      }
      refetch()
      if (isLoading) return
      if (!data?.cancelled) {
        filesController?.send({
          type: 'add.files',
          payload: {
            files: data?.list ?? []
          }
        })
      }
    },
    [filesController, data, isLoading]
  )

  return (
    <div className={clsx('flex h-full mt-8')}>
      <div className="h-full">
        <aside
          data-state={isSidebarOpen ? 'open' : 'closed'}
          className={clsx(
            // 'fixed -left-0 top-4',
            'w-[272px] flex flex-col h-full',
            'transition-transform duration-150 ease-out',
            'data-[state=open]:translate-x-0 data-[state=open]:translate-y-0',
            'data-[state=closed]:translate-y-4 data-[state=closed]:-translate-x-full'
          )}
        >
          {props.Sidebar}
        </aside>
        {/* <div
          data-state={isSidebarOpen ? 'open' : 'closed'}
          className={clsx(
            'h-full',
            'transition-[width] duration-150 ease-out',
            'data-[state=open]:w-[272px] data-[state=closed]:w-0'
          )}
        >
          {isSidebarOpen}
        </div> */}
      </div>
      <section
        className={clsx('grow overflow-y-scroll overflow-x-auto px-4 pt-8 pb-4 scroll-py-8')}
      >
        {props.ContentArea}
      </section>
    </div>
  )
}

export { BaseLayout }

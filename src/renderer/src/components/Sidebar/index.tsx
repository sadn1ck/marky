import { shallowEqual, useSelector } from '@xstate/react'
import { useBootstrapChildren } from '../../hooks/use-bootstrap-children'
import { clsx } from 'clsx'

export const Sidebar = () => {
  const { filesController } = useBootstrapChildren()
  const [fileList, currentFile] = useSelector(
    filesController,
    (s) => [s?.context.files ?? [], s?.context.currentFile ?? null],
    shallowEqual
  )

  return (
    <ul className="w-full h-full border border-red-400" style={{ all: 'unset' }}>
      {fileList.map((file) => (
        <li
          key={file.fullPath}
          className={clsx(
            'px-2 py-1 transition-colors duration-200',
            file.fullPath === currentFile?.fullPath
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
        >
          <button
            onClick={() => filesController?.send({ type: 'open.file', payload: { file } })}
            className={'w-full'}
          >
            {file.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

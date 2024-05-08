import { shallowEqual, useSelector } from '@xstate/react'
import { clsx } from 'clsx'
import fileicon from '../../assets/file.svg?raw'
import mdicon from '../../assets/md.svg?raw'
import txticon from '../../assets/txt.svg?raw'
import trashicon from '../../assets/trash.svg?raw'
import { useBootstrapChildren } from '../../hooks/use-bootstrap-children'
import { Icon } from '../../layouts/Icon'

const renderIcon = (path: string) => {
  if (path.endsWith('.md')) {
    return mdicon
  } else if (path.endsWith('.txt')) {
    return txticon
  } else return fileicon
}

const truncateFileName = (path: string) => {
  if (path.length > 20) {
    return path.slice(0, 20) + '...'
  }
  return path
}

export const Sidebar = () => {
  const { filesController } = useBootstrapChildren()
  const [fileList, currentFile] = useSelector(
    filesController,
    (s) => [s?.context.files ?? [], s?.context.currentFile ?? null],
    shallowEqual
  )

  return (
    <nav className="p-4 pb-0 min-h-full">
      <span className="uppercase px-1 tracking-wider text-xs text-secondary">Files</span>
      <ul
        className="flex flex-col gap-[2px] mt-2 bg-secondary rounded-md overflow-clip text-sm"
        style={{
          height: 'calc(100% - 64px)'
        }}
      >
        {fileList.map((file) => (
          <li
            key={file.fullPath}
            className={clsx(
              'transition-colors duration-100',
              'hover:bg-gray-600/30',
              'flex items-center gap-1',
              currentFile?.fullPath === file.fullPath
                ? 'bg-gray-600/30 text-primary'
                : 'text-secondary'
            )}
          >
            <Icon className="ml-1" icon={renderIcon(file.fullPath)} />
            <button
              onClick={() => filesController?.send({ type: 'open.file', payload: { file } })}
              className={clsx('w-full h-full p-1')}
              title={`Open ${file.name}`}
            >
              {truncateFileName(file.name)}
            </button>
            <button
              onClick={() => {
                filesController?.send({ type: 'remove.file', payload: { file } })
              }}
              title={`Remove ${file.name} from marky`}
            >
              <Icon className="hover:text-red-400" icon={trashicon} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

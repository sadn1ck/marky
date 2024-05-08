import { Icon } from '../../layouts/Icon'
import fileicon from '../../assets/file.svg?raw'
import type { PropsWithChildren } from 'react'
import clsx from 'clsx'

const Key = ({ children }: PropsWithChildren) => {
  return (
    <kbd
      className={clsx(
        'px-1 mx-0.5 text-sm font-semibold rounded-sm',
        'text-gray-800 bg-gray-100 ',
        'dark:bg-gray-600 dark:text-gray-100 ',
        'border border-gray-200 dark:border-gray-500',
        'inline-grid place-items-center'
      )}
    >
      {children}
    </kbd>
  )
}

export const NoFileOpened = () => {
  return (
    <div className="contentarea flex justify-center items-center">
      <div className="flex flex-col items-center text-sm text-secondary">
        <Icon icon={fileicon} className="w-8 h-8" />
        <span className="">No file opened</span>
        <span className="">
          Press <Key>⌘</Key> + <Key>o</Key> to open the file picker
        </span>
      </div>
    </div>
  )
}

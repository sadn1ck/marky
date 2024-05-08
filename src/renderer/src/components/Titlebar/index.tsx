import clsx from 'clsx'
import type { CSSProperties } from 'react'

export const WindowTitle = () => {
  return (
    <div
      className={clsx(
        'absolute top-0 h-8 w-full electron-drag',
        'flex items-center justify-center',
        'text-sm font-bold text-primary/20 text-center',
        'select-none pointer-events-none backdrop-blur-[2px]'
      )}
      style={
        {
          top: 0,
          background: 'linear-gradient(to top, transparent,rgb(var(--bg)))',
          maskImage: 'linear-gradient(to bottom, rgb(var(--bg)) 50%, transparent)'
        } as CSSProperties
      }
    >
      {document.title}
    </div>
  )
}

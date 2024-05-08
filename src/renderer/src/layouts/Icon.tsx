import { clsx } from 'clsx'

export const Icon = ({ icon, className }: { icon: string; className?: string }) => (
  <span
    dangerouslySetInnerHTML={{ __html: icon }}
    className={clsx('p-0.5 h-full aspect-square', 'flex items-center justify-center', className)}
  />
)

type Persisted<T> = {
  data: T
  lastStoreAt: number
}

type MarkyFile = {
  name: string
  fullPath: string
  type: 'file' | 'folder'
}

export type { MarkyFile, Persisted }

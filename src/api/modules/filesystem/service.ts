import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

interface FileSystemContract {
  getFileList(path: string): {
    name: string
    fullPath: string
    type: 'file' | 'folder'
  }[]
  openFile(path: string): string
}

const ignoredDirentries = new Set(['node_modules'])

class FileSystemService implements FileSystemContract {
  // constructor() {}

  getFileList(path: string) {
    const stat = readdirSync(path, {
      withFileTypes: true
    })
    // const files = []
    // TODO: impl folders
    // const folders = []
    return stat
      .filter((direntry) => {
        const ignored = ignoredDirentries.has(direntry.name)
        return direntry.isFile() && !ignored
      })
      .map((direntry) => {
        return {
          name: direntry.name,
          fullPath: join(path, direntry.name),
          type: 'file'
        } satisfies ReturnType<FileSystemContract['getFileList']>[number]
      })
  }

  openFile(path: string) {
    const content = readFileSync(path, 'utf8')
    return content
  }
}

export const fileSystemService = new FileSystemService()

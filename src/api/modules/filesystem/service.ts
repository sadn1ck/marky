import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { MarkyFile } from '../../../types'

interface FileSystemContract {
  getFileList(path: string): Promise<MarkyFile[]>
  openFile(path: string): Promise<string>
  writeFileContent(path: string, content: string): Promise<void>
}

// TODO: maybe read from gitignore as well later?
const ignoredDirentries = new Set(['node_modules'])

class FileSystemService implements FileSystemContract {
  async getFileList(path: string) {
    const stat = await readdir(path, {
      withFileTypes: true
    })
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
        } satisfies MarkyFile
      })
  }

  async getFilesFromPaths(paths: string[]) {
    const files: MarkyFile[] = []
    paths.forEach((fullPath) => {
      const fileName = fullPath.split('/').at(-1)
      if (fileName) {
        files.push({ fullPath, name: fileName, type: 'file' })
      }
    })
    return files
  }

  async openFile(path: string) {
    const content = await readFile(path, {
      encoding: 'utf8'
    })
    return content
  }

  async writeFileContent(path: string, content: string) {
    await writeFile(path, content, {
      encoding: 'utf8'
    })
  }
}

export const fileSystemService = new FileSystemService()

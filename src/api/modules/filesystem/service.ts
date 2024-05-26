import { readFile, writeFile } from 'node:fs/promises'
import type { MarkyFile } from '../../../types'

interface FileSystemContract {
  openFile(path: string): Promise<string>
  writeFileContent(path: string, content: string): Promise<void>
}

class FileSystemService implements FileSystemContract {
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
    const content = await readFile(path, 'utf8')
    return content
  }

  async writeFileContent(path: string, content: string) {
    await writeFile(path, content, {
      encoding: 'utf8'
    })
  }
}

export const fileSystemService = new FileSystemService()

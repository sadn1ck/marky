import { expect, test } from 'vitest'
import { fileSystemService } from './service'

test('fs::getFileList', async () => {
  const files = fileSystemService.getFileList('./__testing__')
  expect(files.length).toBeGreaterThan(0)
})

test('fs::openFile', async () => {
  const files = fileSystemService.getFileList('./__testing__')
  expect(files.length).toBeGreaterThan(0)
  const firstFileContent = fileSystemService.openFile(files[0].fullPath)
  expect(firstFileContent.length).toBeGreaterThan(0)
})

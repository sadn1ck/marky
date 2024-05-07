import { expect, test } from 'vitest'
import { fileSystemService } from './service'
import { rm } from 'fs/promises'
import { join } from 'path'

test('fs::getFileList', async () => {
  const files = await fileSystemService.getFileList('./fixtures')
  expect(files.length).toBeGreaterThan(0)
})

test('fs::openFile', async () => {
  const files = await fileSystemService.getFileList('./fixtures')
  expect(files.length).toBeGreaterThan(0)
  const firstFileContent = await fileSystemService.openFile(files[0].fullPath)
  expect(firstFileContent.length).toBeGreaterThan(0)
})

test('fs::writeFileContent', async () => {
  // setup - create a file
  const filePath = './fixtures/write-file-fixture.md'
  const sampleContent = 'test content'
  fileSystemService.writeFileContent(filePath, sampleContent)
  // verify
  const fullPath = join(process.cwd(), filePath)
  const content = await fileSystemService.openFile(fullPath)
  expect(content).toBe(sampleContent)
  // cleanup
  rm(filePath)
})

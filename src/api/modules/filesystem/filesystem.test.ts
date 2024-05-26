import { rm } from 'fs/promises'
import { join } from 'path'
import { expect, test } from 'vitest'
import { fileSystemService } from './service'

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

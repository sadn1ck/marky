import { initTRPC } from '@trpc/server'
import { dialog } from 'electron'
import { z } from 'zod'
import { fileSystemService } from './modules/filesystem/service'

const t = initTRPC.create({ isServer: true })

export const router = t.router({
  __ping__: t.procedure.input(z.object({ message: z.string() })).query((req) => {
    console.log('router ping pong', req.input.message)
    return {
      message: `pong ${req.input.message}!`
    }
  }),
  showDirectoryPicker: t.procedure.query(async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (!result.canceled && result.filePaths.length > 0) {
      console.log(`openDirectory`, result.filePaths[0])
      return {
        cancelled: false as const,
        list: fileSystemService.getFileList(result.filePaths[0])
      }
    }
    return {
      cancelled: true as const
    }
  }),
  selectFiles: t.procedure.query(async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      buttonLabel: 'Select files'
    })
    if (!result.canceled && result.filePaths.length > 0) {
      console.log('selectFiles::', result)
      return {
        cancelled: false as const,
        list: await fileSystemService.getFilesFromPaths(result.filePaths)
      }
    }
    return {
      cancelled: true as const
    }
  }),
  openFile: t.procedure.input(z.object({ path: z.string() })).query((req) => {
    return fileSystemService.openFile(req.input.path)
  }),
  saveFileContent: t.procedure
    .input(z.object({ path: z.string(), content: z.string() }))
    .mutation(async (req) => {
      return await fileSystemService.writeFileContent(req.input.path, req.input.content)
    })
})

export type AppRouter = typeof router

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
  selectFilesToOpen: t.procedure.query(async () => {
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
  openFileContents: t.procedure.input(z.object({ path: z.string() })).query((req) => {
    const content = fileSystemService.openFile(req.input.path)
    return content
  }),
  saveFileContents: t.procedure
    .input(z.object({ path: z.string(), content: z.string() }))
    .mutation(async (req) => {
      return await fileSystemService.writeFileContent(req.input.path, req.input.content)
    })
})

export type AppRouter = typeof router

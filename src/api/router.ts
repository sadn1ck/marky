import { initTRPC } from '@trpc/server'
import { dialog } from 'electron'
import { z } from 'zod'
import { fileSystemService } from './modules/filesystem/service'

const t = initTRPC.create({ isServer: true })

export const router = t.router({
  //
  selectFilesToOpen: t.procedure.query(async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      buttonLabel: 'Open files in Marky',
      filters: [
        {
          extensions: ['md'],
          name: 'markdown'
        }
      ]
    })
    if (!result.canceled && result.filePaths.length > 0) {
      return {
        cancelled: false as const,
        list: await fileSystemService.getFilesFromPaths(result.filePaths)
      }
    }
    return {
      cancelled: true as const
    }
  }),
  //
  openFileContents: t.procedure.input(z.object({ path: z.string() })).query((req) => {
    const content = fileSystemService.openFile(req.input.path)
    return content
  }),
  //
  saveFileContents: t.procedure
    .input(z.object({ path: z.string(), content: z.string() }))
    .mutation(async (req) => {
      return await fileSystemService.writeFileContent(req.input.path, req.input.content)
    })
})

export type AppRouter = typeof router

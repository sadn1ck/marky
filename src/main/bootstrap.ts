import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'
import { WindowManager } from './manager'

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// no await since main/preload is cjs
// electron pls
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.sadn1ck.marky')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const windowMgr = new WindowManager()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      windowMgr.createBrowserWindow
    }
  })
})

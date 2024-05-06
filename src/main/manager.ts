import { is } from '@electron-toolkit/utils'
import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { createIPCHandler } from 'electron-trpc/main'
import { join } from 'node:path'
import { router } from '../api/router'
import defaultOptions from './options'

export class WindowManager {
  mainWindow: BrowserWindow

  constructor(options: BrowserWindowConstructorOptions = defaultOptions) {
    this.mainWindow = this.createBrowserWindow(options)
    this.setupEventHandlersOnMainWindow()
    this.loadContent()
    this.setupIPCHandler()
  }

  createBrowserWindow(options: BrowserWindowConstructorOptions = defaultOptions) {
    this.mainWindow = new BrowserWindow(options)
    return this.mainWindow
  }

  setupEventHandlersOnMainWindow() {
    this.mainWindow.on('ready-to-show', () => {
      this.mainWindow.show()
    })

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  }

  loadContent() {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.webContents.openDevTools()
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }

  // inject router later
  setupIPCHandler() {
    createIPCHandler({ router, windows: [this.mainWindow] })
  }
}

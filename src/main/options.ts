import { BrowserWindowConstructorOptions } from 'electron'
import { join } from 'node:path'
import icon from '../../resources/icon.png?asset'

const options: BrowserWindowConstructorOptions = {
  width: 1080,
  height: 720,
  show: false,
  // set to true
  // and https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region
  frame: true,
  autoHideMenuBar: true,
  ...(process.platform === 'linux' ? { icon } : {}),
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false,
    contextIsolation: true
  }
}

export default options

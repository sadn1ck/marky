import type { BrowserWindowConstructorOptions } from 'electron'
import { join } from 'node:path'
import icon from '../../resources/icon.png?asset'

const options: BrowserWindowConstructorOptions = {
  width: 1280,
  height: 720,
  show: false,
  transparent: true,
  // set to false
  // and https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region
  frame: false,
  titleBarStyle: 'hidden',
  trafficLightPosition: {
    x: 16,
    y: 8
  },
  ...(process.platform === 'linux' ? { icon } : {}),
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false,
    contextIsolation: true
  }
}

export default options

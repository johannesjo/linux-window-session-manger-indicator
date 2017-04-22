'use strict';

const path = require('path');
const url = require('url');
const fs = require('fs');
const electron = require('electron');
const lwsm = require('linux-window-session-manager');

const LWSM_CFG = lwsm.getCfg();
const db = lwsm.getDb();

console.log(LWSM_CFG.SESSION_DATA_DIR);
const CONFIG = require('./CONFIG');
const inputHandlers = require('./inputHandlers');
const ICONS_FOLDER = __dirname + '/assets/icons/';

// Module to control application life.
const app = electron.app;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWin;
let darwinForceQuit = false;
let tray = null;

// Make it a single instance
let shouldQuitBecauseAppIsAnotherInstance = app.makeSingleInstance(() => {
  if (mainWin) {
    if (mainWin.isMinimized()) {
      mainWin.restore();
    }
    mainWin.focus();
  }
});
if (shouldQuitBecauseAppIsAnotherInstance) {
  console.log('QUITING because another instance is running already');
  app.exit(1);
  process.exit(1);
}

// APP LISTENERS
// --------------------

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
app.on('ready', setApplicationMenu);
app.on('ready', createTray);
app.on('ready', () => {
  setInterval(checkMonitors, CONFIG.PING_INTERVAL);
});
app.on('ready', () => {
  // hide initially
  // mainWin.hide();
});

app.on('before-quit', beforeQuit);

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWin === null) {
    createWindow();
  } else {
    mainWin.show();
  }

});

// FUNCTIONS
// --------------------
function createWindow() {
  // Create the browser window.
  mainWin = new electron.BrowserWindow({ width: 800, height: 600 });

  if (process.env.NODE_ENV === 'DEV') {
    mainWin.loadURL('http://localhost:4200/');
  } else {
    // and load the index.html of the app.
    mainWin.loadURL(
      url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true,
        webPreferences: {
          scrollBounce: true
        },
        icon: ICONS_FOLDER + '/app-icons/icon_256x256.png'
      })
    );
  }

  // Open the DevTools.
  mainWin.webContents.openDevTools();

  // open new window links in browser
  mainWin.webContents.on('new-window', function (event, url) {
    event.preventDefault();
    open(url);
  });

  mainWin.on('close', function (event) {
    // handle darwin
    if (process.platform === 'darwin') {
      if (!darwinForceQuit) {
        event.preventDefault();
        mainWin.hide();
      }
    } else {
      if (!app.isQuiting) {
        event.preventDefault();
        mainWin.hide();
      }
    }
  });

  mainWin.on('minimize', function (event) {
    event.preventDefault();
    mainWin.hide();
  });
}

function setApplicationMenu() {
  // Create application menu to enable copy & pasting on MacOS
  const menuTpl = [{
    label: 'Application',
    submenu: [
      { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      {
        label: 'Quit', click: function () {
        app.quit();
      }
      }
    ]
  }, {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
    ]
  }
  ];

  // we need to set a menu to get copy & paste working for mac os x
  electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(menuTpl));
}

function showOrFocus(win) {
  if (win.isVisible()) {
    win.focus();
  } else {
    win.show();
  }
}

function createTray() {
  let trayIcoFile;
  if (process.platform === 'darwin') {
    // use dark icon for mac os
    trayIcoFile = 'tray-ico-dark.png'
  } else {
    trayIcoFile = 'tray-ico.png'
  }

  tray = new electron.Tray(ICONS_FOLDER + trayIcoFile);
  setContextMenu();

  //tray.on('click', () => {
  //  mainWin.show();
  //});
}

function setContextMenu() {
  console.log('SET CONTEXT');

  const menu = [
    {
      label: 'Show App',
      click: () => {
        mainWin.show();
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    },
    {
      type: 'separator'
    },
  ];

  const sessionDataFiles = fs.readdirSync(LWSM_CFG.SESSION_DATA_DIR);

  sessionDataFiles.forEach((sessionDataFile) => {
    const sessionName = sessionDataFile.replace('.json', '');
    menu.push({
      label: 'load ' + sessionName,
      click: () => {
        lwsm.restoreSession(sessionName);
      }
    })
  });
  menu.push({
    type: 'separator'
  });
  sessionDataFiles.forEach((sessionDataFile) => {
    const sessionName = sessionDataFile.replace('.json', '');
    menu.push({
      label: 'save current to ' + sessionName,
      click: () => {
        lwsm.saveSession(sessionName, inputHandlers);
      }
    })
  });

  const contextMenu = electron.Menu.buildFromTemplate(menu);
  tray.setContextMenu(contextMenu);
}

function beforeQuit() {
  if (tray) {
    tray.destroy();
  }

  // handle darwin
  if (process.platform === 'darwin') {
    darwinForceQuit = true;
  }

  // Unregister all shortcuts.
  electron.globalShortcut.unregisterAll();
}

function checkMonitors() {

}

// FRONTEND LISTENERS
// --------------------
// listen to events from frontend
electron.ipcMain.on('SHUTDOWN', () => {
  app.isQuiting = true;
  app.quit();
});

electron.ipcMain.on('GET_SESSION_DATA', () => {
  db.all((err, sessionDataEntries) => {
    if (err) {
      mainWin.webContents.send('GET_SESSION_DATA_ERROR', err);
    } else {

      // transform data to array
      const entries = [];
      for (let key of Object.keys(sessionDataEntries)) {
        entries.push(sessionDataEntries[key]);
      }

      // send data
      mainWin.webContents.send('GET_SESSION_DATA_SUCCESS', entries);
    }
  });
});

electron.ipcMain.on('SAVE_SESSION_DATA', (ev, sessionData) => {
  db.save(sessionData.name, sessionData, (err, res) => {
    if (err) {
      mainWin.webContents.send('SAVE_SESSION_DATA_ERROR', err);
    } else {
      setContextMenu();
      mainWin.webContents.send('SAVE_SESSION_DATA_SUCCESS', res);
    }
  });
});

electron.ipcMain.on('REMOVE_SESSION', (ev, sessionName) => {
  lwsm.removeSession(sessionName)
    .then(() => {
      setContextMenu();
      mainWin.webContents.send('REMOVE_SESSION_SUCCESS');
    })
    .catch((err) => {
      mainWin.webContents.send('REMOVE_SESSION_ERROR', err);
    });
});

electron.ipcMain.on('SAVE_CURRENT_SESSION', (ev, sessionName) => {
  lwsm.saveSession(sessionName, inputHandlers)
    .then(() => {
      setContextMenu();
      mainWin.webContents.send('SAVE_CURRENT_SESSION_SUCCESS');
    })
    .catch((err) => {
      mainWin.webContents.send('SAVE_CURRENT_SESSION_ERROR', err);
    });
});

electron.ipcMain.on('LOAD_SESSION', (ev, sessionName) => {
  lwsm.restoreSession(sessionName)
    .then(() => {
      mainWin.webContents.send('LOAD_SESSION_SUCCESS');
    })
    .catch((err) => {
      mainWin.webContents.send('LOAD_SESSION_ERROR', err);
    });
});
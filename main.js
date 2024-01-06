const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            contextIsolation: true, // 컨텍스트 격리 활성화
            nodeIntegration: false, // Node.js 통합 비활성화
            webviewTag: true, // WebView 사용을 위해 필요
            preload: path.join(__dirname, 'preload.js') // preload 스크립트 지정
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('minimize', (event) => {
    BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('maximize', (event) => {
    const window = BrowserWindow.getFocusedWindow();
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
});

ipcMain.on('close', (event) => {
    BrowserWindow.getFocusedWindow().close();
});

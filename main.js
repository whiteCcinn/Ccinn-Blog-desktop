// 加载node.js的工具path模块
const path = require('path')
// 加载glob可以通配匹配的模块
const glob = require('glob')

// 使用ES6的解构赋值
const {BrowserWindow, app} = require('electron')

// 在MAS OS系统下设置程序名称
if (process.mas) app.setName('白菜(WhiteCcinn)的博客')

// 声明主进程对象
let mainWindow = null

// 初始化项目
function initialize() {
    let shouldQuit = makeSingleInstance()
    if (shouldQuit) return app.quit()

    function createWindow() {
        let windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName(),
            icon: path.join(__dirname, '/assets/app-icon/yeah.ico'),
            autoHideMenuBar:true // 除非点击Alt，否则菜单栏隐藏
        }

        // 通过process对象的platform属性检查
        if (process.platform === 'linux') {
            /* do something */
        }

        // 实例化主进程window原生窗口
        mainWindow = new BrowserWindow(windowOptions)
        // 内容通过URL载入
        mainWindow.loadURL('https://usblog.crazylaw.cn/')
        // 关闭菜单栏
        mainWindow.setMenu(null)
        // 窗口最大化
        // mainWindow.maximize()

        // 打开调试工具
        // mainWindow.webContents.openDevTools()

        // window窗口关闭的回调函数
        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    // 项目启动的ready回调函数
    app.on('ready', () => {
        createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

// 创建一个单例对象
function makeSingleInstance() {
    // 如果是Mac平台的话，返回true，其他平台的话，返回undefined。
    if (process.mas) return false

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}


// StartUp启动事件
switch (process.argv[1]) {
    case 'run':
    default:
        initialize()
}

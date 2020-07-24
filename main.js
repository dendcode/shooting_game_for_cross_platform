// 일렉트론 기본 모듈
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // 새로운 브라우저 창 생성
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 기본 시작 파일 로드
  mainWindow.loadFile('index.html')

  // 데브툴을 열려면 아래 코드 활성화
  // mainWindow.webContents.openDevTools()
}

// 아래 메소드는 일렉트론이 이니셜라이제이션을 끝내면 실행 되며
// 브라우저 창을 생성할 준비를 완료 시킨다.
// 어떤 API들은 이 이벤트를 불러와야만 이용 될 수 있다.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // 맥킨토시OS에선, 다른 어떤 창이 열려 있지 않을때 독 아이콘을 클릭 시 앱을 창안에서 재생성 한다.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 모든 창이 종료 될때 종료된다, 맥OS에선 제외. 유저가 커맨드 + Q를 하기 전까진 활성화 되어 있다.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

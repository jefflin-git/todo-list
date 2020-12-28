// 載入 express 並建構應用程式伺服器
const express = require('express')
//載入express-handlebars
const exphbs = require('express-handlebars')
// 引用mongoose檔
require('./config/mongoose')
const app = express()
// 引用 body-parser
const bodyParser = require('body-parser')
//載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes/index.js')



//設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
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
const session = require('express-session')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT


//設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.use(flash())

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

// 將 request 導入路由器
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
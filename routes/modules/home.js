// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Todo model
const Todo = require('../../models/todo.js')

// 定義首頁路由
router.get('/', (req, res) => {
    Todo.find()  // 取出 Todo model 裡的所有資料
        .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort({ _id: 'asc' })  //根據 _id 升冪排序
        .then(todos => res.render('index', { todos }))
        .catch(error => console.log(error))  // 錯誤處理
})

// 匯出路由模組
module.exports = router
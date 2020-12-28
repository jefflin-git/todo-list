const express = require('express')
const router = express.Router()
// 引入 todos 模組程式碼
const Todo = require('../../models/todo.js')

//設定建立頁面路由
router.get('/new', (req, res) => {
    res.render('new')
})
//設定新增POST路由
router.post('/', (req, res) => {
    const name = req.body.name  // 從 req.body 拿出表單裡的 name 資料
    // Todo.create({ name })  // 存入資料庫
    const todos = (name).toString().split(',').map(todo => ({ name: todo }))
    Todo.insertMany(todos)
        .then(() => res.redirect('/'))  // 新增完成後導回首頁
        .catch(error => console.log(error))

})
//瀏覽detail路由
router.get('/:id', (req, res) => {
    const id = req.params.id
    Todo.findById(id)
        .lean()
        .then(todo => res.render('detail', { todo }))
        .catch(error => console.log(error))
})
//edit路由
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Todo.findById(id)
        .lean()
        .then(todo => res.render('edit', { todo }))
        .catch(error => console.log(error))
})
//update路由
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, isDone } = req.body
    return Todo.findById(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})
//delete路由
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Todo.findById(id)
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router
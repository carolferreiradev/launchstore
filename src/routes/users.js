const express = require('express');
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const { isLoggedRedirectToUsers, onlyUsersDo } = require('../app/middlewares/session')


// login/logout
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

//reset password / forgot
//routes.get('/forgot-password', SessionController.forgotForm)
//routes.post('/forgot-password', SessionController.forgot)

//routes.get('/password-reset', SessionController.resetForm)
//routes.post('/password-reset', SessionController.reset)

//user register UserController
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', onlyUsersDo, UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
//routes.delete('/', UserController.delete)

//exportando a rota
module.exports = routes
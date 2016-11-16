'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const formParser = bodyParser.urlencoded({type: 'application/x-www-form-urlencoded'})
const app = express()
const controller = require('./controller')

// handle oauth callback and start bot
app.get('/oauth', controller.oauth)

// handle slash command
app.post('/slash', formParser, controller.slash)

// need to use something like localtunnel to expose this server to the Internet
app.listen(9000, () => {
  console.log('server listening on 9000')
})

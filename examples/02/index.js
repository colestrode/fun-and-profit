'use strict'

const api = require('./api')

api.rtm.start((err, bot) => {
  if (err) {
    return console.log(err)
  }

  bot.on(/hello/, (bot, message) => {
    bot.reply(message, 'Go CUBSSSS')
  })

  bot.on(/howdy/, (bot, message) => {
    bot.reply(message, 'Go TRIBE')
  })
})

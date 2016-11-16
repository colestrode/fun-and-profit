module.exports = {
  init: init,
  botConnected: botConnected,
  help: {
    command: 'hello',
    text: 'Type `hello` or `howdy` and see what happens! Or maybe give `/secret` a try!'
  }
}

function init (controller) {
  controller.on('slash_command', (bot, message) => {
    if (message.command !== '/secret') {
      return true
    }

    bot.replyPrivate(message, /hello/.test(message.text) ? 'GO CUBS' : 'GO TRIBE')
    return false // stop event propagation
  })

  controller.hears('hello', ['ambient'], (bot, message) => {
    bot.reply(message, 'GO CUBS')
  })

  controller.hears('howdy', ['ambient'], (bot, message) => {
    bot.reply(message, 'GO TRIBE')
  })
}

function botConnected (controller) {
  controller.log('bot connected! this would be a good time to dm somebody or post to general or build a cache or something')
}

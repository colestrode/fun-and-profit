module.exports = {
  init: function (controller) {
    controller.hears('hello', ['ambient'], (bot, message) => {
      bot.reply(message, 'GO CUBS')
    })

    controller.hears('howdy', ['ambient'], (bot, message) => {
      bot.reply(message, 'GO TRIBE')
    })
  }
}

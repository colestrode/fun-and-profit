const Botkit = require('botkit')

const controller = Botkit.slackbot({debug: false, status_optout: false})

controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM((err, connectedBot) => {
  if (err) {
    return console.log('Error starting RTM', err)
  }

  console.log(`connected to ${connectedBot.team_info.name} (${connectedBot.team_info.id}) as ${connectedBot.identity.name} (${connectedBot.identity.id})`)
})

// hears is a special way to register an "message" event listener
// the first arg is a String or array of Strings that will be used as a regex matching the incoming message text
// the second arg specifies how the message should be addressed to the bot: ambient, direct_mention, mention, direct_message
// the third arg is the
controller.hears('hello', ['ambient'], (bot, message) => {
  bot.reply(message, 'GO CUBS')
})

controller.hears('howdy', ['ambient'], (bot, message) => {
  bot.reply(message, 'GO TRIBE')
})

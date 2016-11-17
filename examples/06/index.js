const Botkit = require('botkit')

const controller = Botkit.slackbot({debug: false, status_optout: false})

controller.configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scopes: ['bot']
})

// botkit will set up an express app for you and add routes for slash commands and oauth if you want
controller.setupWebserver(9000, (err) => {
  if (err) {
    return console.log(`Error setting up server on port 9000`, err)
  }

  controller.createWebhookEndpoints(controller.webserver) // synchronous method

  controller.createOauthEndpoints(controller.webserver, (err, req, res) => {
    if (err) {
      return controller.log.error(`Error completing OAuth flow: ${err.message}`)
    }

    // handles response from oauth call
    res.redirect('https://github.com/colestrode/skellington')
  })
})

controller.on('create_bot', (bot) => {
  bot.startRTM((err, connectedBot) => {
    if (err) {
      return controller.log.error(`Could not connect bot to RTM: ${err.message}`)
    }

    console.log(`connected to ${connectedBot.team_info.name} (${connectedBot.team_info.id}) as ${connectedBot.identity.name} (${connectedBot.identity.id})`)
  })
})

// on is a lower level listener. there is only one event for slash commands and only one endpoint
// botkit translates payloads to events and publishes them on the controller, you will need to test in your callback which command this is
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

const api = require('./api')
const controller = module.exports

// handles oauth callbacks
controller.oauth = function(req, res) {
  res.redirect('https://github.com/colestrode/skellington')

  api.oauth.access(req.query.code, (err, token) => {
    if (err) {
      return console.log(err);
    }

    startRtm(token)
  })
}

// handles slash command
controller.slash = function(req, res) {
  const response = {
    text: /hello/.test(req.body.text) ? 'GO CUBS' : 'GO TRIBE',
    response_type: 'ephemeral'
  }

  res.status(200).send(response)
}

// starts the rtm connection
function startRtm (token) {
  api.rtm.start(token, (err, bot) => {
    if (err) {
      return console.log(err)
    }

    bot.on(/hello/, (bot, message) => {
      bot.reply(message, 'GO CUBS')
    })

    bot.on(/howdy/, (bot, message) => {
      bot.reply(message, 'GO TRIBE')
    })
  })
}
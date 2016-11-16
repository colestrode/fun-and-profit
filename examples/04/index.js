const express = require('express')
const request = require('request')
const app = express();
const api = require('./api')


app.get('/oauth', (req, res) => {
  res.redirect('https://github.com/colestrode/skellington')

  request({
    method: 'GET',
    uri: 'https://slack.com/api/oauth.access',
    json: true,
    qs: {
      // you can get these values by registering a new app at https://api.slack.com/apps
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code
    }
  }, oauthAccessHandler)
})

// need to use something like localtunnel to expose this server to the Internet
app.listen(9000, () => {
  console.log('server listening on 9000');
})


// Handles the call to oauth.access to receive the OAuth access token
function oauthAccessHandler(err, res, body) {
  if (err || res.statusCode >= 400 || !body.ok) {
    return console.log('error authenticating', err || body);
  }

  startRtm(body.bot.bot_access_token)
}

// starts the rtm connection
function startRtm(token) {
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

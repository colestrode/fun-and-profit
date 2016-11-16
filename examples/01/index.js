'use strict'

const request = require('request')
const Ws = require('ws')
let lastMessageId = 0

// use Slack web API to get an RTM API URL
request({
  method: 'GET',
  uri: `https://slack.com/api/rtm.start`,
  json: true,
  qs: {
    no_unreads: true,
    simple_latest: true,
    token: process.env.SLACK_TOKEN
  }
}, rtmStart)

function rtmStart (err, res, body) {
  // handle some errors
  if (err || res.statusCode >= 400 || !body.ok) {
    return console.log('Error starting RTM', err || body)
  }

  // use the url to open a new websocket
  const rtm = new Ws(body.url, null, {agent: null})

  // hey look! it worked!
  rtm.on('open', () => {
    console.log(`connected to ${body.team.name} (${body.team.id}) as ${body.self.name} (${body.self.id})`)
  })

  // let's just bail if something bad happens, you could try to reconnect
  rtm.on('error', (err) => {
    console.log('oh man, an error happened!', err)
    process.exit(1)
  })

  // this is where the magic will happen
  rtm.on('message', (event) => {
    const message = JSON.parse(event)
    // slack has many message types: https://api.slack.com/rtm
    if (message.type === 'message') {
      messageHandler(rtm, message)
    }
  })
}

// this callback decides how we respond to a "message" event
function messageHandler (rtm, message) {
  if (/hello/.test(message.text)) {
    reply(rtm, message, 'GO CUBS')
  } else if (/howdy/.test(message.text)) {
    reply(rtm, message, 'GO TRIBE')
  }
}

// reply using the websocket connection
function reply (rtm, message, text) {
  const replyMessage = {
    id: ++lastMessageId, // need a unique (for this connection), non-negative ID for this message
    type: 'message',
    channel: message.channel,
    text: text
  }

  rtm.send(JSON.stringify(replyMessage), (err) => {
    if (err) {
      return console.log(`could not reply to message ${message.ts} in ${message.channel}`)
    }
  })
}

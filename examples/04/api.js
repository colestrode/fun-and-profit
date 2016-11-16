const request = require('request')
const _ = require('lodash')
const api = module.exports
const botFactory = require('./botFactory')

api.rtm = {}
api.rtm.start = function (token, cb) {
  apiRequest(token, 'rtm.start', {
    no_unreads: true,
    simple_latest: true
  }, rtmStart)

  function rtmStart (err, res, body) {
    if (err || res.statusCode >= 400 || !body.ok) {
      return cb(err || body)
    }

    const bot = botFactory.getInstance(token, body)
    cb(null, bot)
  }
}

function apiRequest (token, method, data, cb) {
  if (!cb) {
    cb = data
    data = {}
  }

  request({
    method: 'GET',
    uri: `https://slack.com/api/${method}`,
    json: true,
    qs: _.merge({token: token}, data)
  }, cb)
}

'use strict'

require('skellington')({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: 9000,
  successRedirectUri: 'https://github.com/colestrode/skellington',
  botkit: {
    json_file_store: './db/' // persists authentication across restarts
  },
  plugins: [require('./plugin')]
})

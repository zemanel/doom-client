'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOOM_STATE_SERVICE_URL: `"${process.env.DOOM_STATE_SERVICE_URL}"` || undefined,
  DOOM_ENGINE_SERVICE_URL: `"${process.env.DOOM_ENGINE_SERVICE_URL}"` || undefined,
})

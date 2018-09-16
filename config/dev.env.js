'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

console.log("process.env.DOOM_STATE_SERVICE_URL", process.env.DOOM_STATE_SERVICE_URL)
console.log("process.env.DOOM_ENGINE_SERVICE_URL", process.env.DOOM_ENGINE_SERVICE_URL)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOOM_STATE_SERVICE_URL: `"${process.env.DOOM_STATE_SERVICE_URL}"` || undefined,
  DOOM_ENGINE_SERVICE_URL: `"${process.env.DOOM_ENGINE_SERVICE_URL}"` || undefined,
})

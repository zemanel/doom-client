import loader from './loader'

export default {
  DOOM_STATE_SERVICE_URL: loader.getConfigValue('DOOM_STATE_SERVICE_URL'),
  DOOM_ENGINE_SERVICE_URL: loader.getConfigValue('DOOM_ENGINE_SERVICE_URL')
}

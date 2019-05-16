const rp = require('request-promise')
const conf = require('../config')

export default {
  get: function () {
    return rp.get(`${conf.apiUrl}/status`)
  }
}
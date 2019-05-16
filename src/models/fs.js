const rp = require('request-promise')
const conf = require('../config')

export default {
  openDir: function () {
    return rp.get(`${conf.apiUrl}/open-dir`)
  },
  import: function (path) {
    return rp.get(`${conf.apiUrl}/import?path=${path}`, {json: true})
  }
}
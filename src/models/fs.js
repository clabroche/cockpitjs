const rp = require('request-promise')
const conf = require('../config')

export default {
  openDir () {
    return rp.get(`${conf.apiUrl}/fs/open-dir`)
  },
  recursiveImport (path) {
    return rp.get(`${conf.apiUrl}/fs/import/recursive?path=${path}`, {json: true})
  },
  import (path) {
    return rp.get(`${conf.apiUrl}/fs/import?path=${path}`, {json: true})
  },
  outdated (path) {
    return rp.get(`${conf.apiUrl}/fs/outdated?path=${path}`, {json: true})
  },
  homeDir() {
    return rp.get(`${conf.apiUrl}/fs/home-dir`, {json: true})
  },
  ls(path) {
    return rp.get(`${conf.apiUrl}/fs/ls?path=${path}`, {json: true})
  }
}
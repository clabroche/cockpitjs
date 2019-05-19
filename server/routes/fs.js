var express = require('express');
var router = express.Router();
const walker = require('../lib/walker')
const fse = require('fs-extra')
const pathfs = require('path')
const PromiseB = require('bluebird')
const os = require('os')
const sort = require('fast-sort')
const npm = require('../lib/npm')

router.get('/import/recursive', async function(req, res, next) {
  const npms = await walker.import(req.query.path) 
  res.json(npms)
});
router.get('/import', async function(req, res, next) {
  const infos = await npm.getNpmInfos(req.query.path) 
  res.json(infos)
});
router.get('/outdated', async function(req, res, next) {
  await npm.outdated(req.query.path) 
    .then(infos => res.send(infos))
    .catch(err => res.status(200).send(err))
});
router.get('/open-dir', async function(req, res, next) {
  res.json(process.argv[2])
});
router.get('/home-dir', async function(req, res, next) {
  res.send(os.homedir())
})
router.get('/ls', async function(req, res, next) {
  const path = req.query.path
  const readdir = await fse.readdir(req.query.path)
  const parentDirectory = {
    absolutePath: pathfs.resolve(path, '..'),
    name: '..',
    isDirectory: true
  }
  let dirs = [parentDirectory]
  await PromiseB.map(readdir, async entry => {
    if(entry.charAt(0) === '.') return
    const absolutePath = pathfs.resolve(path, entry)
    const stat = await fse.stat(absolutePath)
    const entryInfos = {
      absolutePath,
      name: entry,
      isDirectory: stat.isDirectory(),
      npmInfos: null
    }
    if(entryInfos.isDirectory) {
      entryInfos.npmInfos = await npm.getNpmInfos(entryInfos.absolutePath)
    }
    dirs.push(entryInfos)
  })
  dirs = sort(dirs).asc(d => d.name.toUpperCase())
  res.json(dirs)
});

module.exports = router;

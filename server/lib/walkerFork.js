const fs = require('fs-extra')
const pathfs = require('path')
const npm = require('./npm')
const PromiseB = require('bluebird')
process.on('message', async path => {
  const dirs = []
  if(path.includes('node_modules') || pathfs.basename(path).charAt(0) === '.') return process.send({dirs, npmPath: null})
  await fs
    .readdir(path)
    .then(async files => {
      const npmInfos = files.includes('package.json')
        ? await npm.getNpmInfos(path) : null
      await PromiseB.map(files, async file => {
        if(file.charAt(0) === '.') return
        const absolutePath = pathfs.resolve(path, file)
        const stat = await fs.stat(absolutePath)
        if(!npmInfos && stat.isDirectory() && !absolutePath.includes('node_modules') && file.charAt(0) !== '.') {
          dirs.push(absolutePath)
        }
      })

      process.send({
        dirs, npmInfos
      })
    })
});

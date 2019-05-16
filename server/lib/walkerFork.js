const fs = require('fs-extra')
const pathfs = require('path')
const PromiseB = require('bluebird')
process.on('message', async path => {
  const dirs = []
  if(path.includes('node_modules') || pathfs.basename(path).charAt(0) === '.') return process.send({dirs, npmPath: null})
  await fs
    .readdir(path)
    .then(async files => {
      const npmPath = files.includes('package.json')
        ? path : null
      await PromiseB.map(files, async file => {
        if(file.charAt(0) === '.') return
        const filePath = pathfs.resolve(path, file)
        const stat = await fs.stat(filePath)
        if(!npmPath && stat.isDirectory() && !filePath.includes('node_modules') && file.charAt(0) !== '.') {
          dirs.push(filePath)
        }
      })
      process.send({
        dirs, npmPath
      })
    })
});
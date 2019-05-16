var express = require('express');
var router = express.Router();
const walker = require('../lib/walker')

router.get('/import', async function(req, res, next) {
  console.log(req.query)
  const npms = await walker.import(req.query.path) 
  console.log(npms)
  res.json(npms)
});
router.get('/open-dir', async function(req, res, next) {
  res.json(process.argv[2])
});


module.exports = router;

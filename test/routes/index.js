var express = require('express');
var router = express.Router();
const { Validation, ValidationError, PermissionError } = require('../utils/common')
const logger = require('../utils/logger')

/* GET home page. */
router.get('/', function(req, res, next) {

  let param1 = ''
  let param2 = 'fdafsdfsfdsf'
  const notNull = Validation.isNull(param1)
  const allNumeric = Validation.isNumeric(param2)

  logger.setLogLevel(logger.Level.TRACE)

  if (!allNumeric) {
      const errrr = new ValidationError('Value must contain numbers only').toJson()
      console.log(errrr)
  }

  if (!notNull) {
      const errrr = new ValidationError('Required fields must not be null').toJson()
      logger.debug(errrr.error.message)
      logger.info(errrr.error.message)
      logger.error(errrr.error.message)
      console.log(errrr)
  }

  res.render('index', { title: 'Express' });
});

module.exports = router;

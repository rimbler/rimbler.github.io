var express = require('express');
var router = express.Router();
const ctrlFxn = require('../controllers/controller');

router.get('/', ctrlFxn.home);
router.get('/index', ctrlFxn.index);
router.get('/resume', ctrlFxn.resume);
router.get('/projects', ctrlFxn.projects);


// const pug = require('pug');

// // Compile the source code
// const homeFxn = pug.compileFile('../views/home.pug');
// const indexFxn = pug.compileFile('../views/index.pug')


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home');
// });

module.exports = router;

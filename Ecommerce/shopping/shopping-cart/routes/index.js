var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Product= require('../models/product');
var User= require('../models/user');
var bcrypt = require('bcrypt-nodejs');
const e = require('express');
var authTokens=require('./data');

// var csrfProtection = csrf();
// router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    var productChunks=[];
    var chunkSize =3;
    for (var i=0;i < docs.length;i +=chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products:productChunks });
  });
  
});
router.get('/user/signup', function(req, res, next){
  var messages= req.flash('error');
  res.render('user/signup');
});

router.post('/user/signup', (req, res, next)=>{
  User.findOne({email:req.body.email}).then((result)=>{
    console.log(result);
    if(!result) {
      new User({
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null)
      }).save().then(doc => {
        console.log(doc);
        res.render('user/profile');
      })
      .catch(err => {
        // TODO on error
        console.error(err)
      });
    } else {
      // TODO on error
    }
  });
 
});

const generateAuthToken = () => {
return crypto.randomBytes(30).toString('hex');
}

router.post('/user/login', (req, res, next)=>{
  User.findOne({email:req.body.email}).then((result)=>{
    if(result) {
      let passwordMatch=bcrypt.compareSync(req.body.password, result.password);
      if(passwordMatch) {
        const authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);

        // Redirect user to the protected page
        res.redirect('/user/profile');
      } else {
        res.render('/user/login', {
          message: 'Invalid username or password',
      });
      }
    
    } else {
      // TODO on error
      res.render('/user/login', {
        message: 'Invalid username or password',
    });
    }
  });
 
});

// router.post('/user/signup', passport.authenticate('local.signup',{
//   successRedirect: '/user/profile',
//   failureRedirect: '/user/signup',
//   failureFlash: true
// }));

router.get('/user/profile', function(req, res, next){
  res.render('user/profile');
});

module.exports = router;

const express = require('express');
const authController = require('../controllers/auth')
const pagesController = require('../controllers/pages')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
      user: req.user,
    });
  });

router.get('/ticket', pagesController.displayTicket, (req, res) => {

  res.render('ticket', {
    ticket: req.ticket,
    user: req.user
  });
});

router.get('/profile', (req, res) => {
    if(req.user) {
      res.render('profile', {
        user: req.user
      });
    } else {
      res.redirect("/login");
    }
    
  });

router.post('/contact', pagesController.sendContact, (req, res) => {
    res.render('contact', {
      user: req.user
    });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    user: req.user
  });
});

router.get('/login', (req, res) => {
    res.render('login');
  });
  
  router.get('/register', (req, res) => {
    res.render('register');
  });

module.exports = router;
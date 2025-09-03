const express = require('express');
const passport = require('passport');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Google OAuth routes
router.get('/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(500).json({ 
      error: 'OAuth not configured',
      message: 'Google OAuth credentials are not configured. Please set up your .env file.'
    });
  }
  
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })(req, res, next);
});

router.get('/google/callback',
  (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.redirect(`${process.env.FRONTEND_URL}/?auth=not_configured`);
    }
    
    passport.authenticate('google', { 
      failureRedirect: '/auth/failure',
      failureMessage: true
    })(req, res, next);
  },
  (req, res) => {

    // Successful authentication, redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/admin`);
  }
);

// Authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',') || [];
    const userEmail = req.user?.emails?.[0]?.value;
    const isAdmin = userEmail && allowedEmails.includes(userEmail);

    // Refresh session to extend cookie lifetime
    req.session.touch();

    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: userEmail,
        photos: req.user.photos
      },
      isAdmin: isAdmin
    });
  } else {
    res.json({
      authenticated: false,
      user: null,
      isAdmin: false
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error during logout' });
    }
    res.redirect(`${process.env.FRONTEND_URL}/`);
  });
});

// Refresh session (for keeping session alive)
router.get('/refresh', isAuthenticated, (req, res) => {
  // Refresh session to extend cookie lifetime
  req.session.touch();
  res.json({ 
    message: 'Session refreshed',
    timestamp: new Date().toISOString()
  });
});

// Authentication failure
router.get('/failure', (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/?auth=failed`);
});

module.exports = router;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Only configure Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // Configure Google OAuth Strategy
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      // Check if user's email is in the allowed admin emails list
      const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',') || [];
      const userEmail = profile.emails?.[0]?.value;

      if (!userEmail || !allowedEmails.includes(userEmail)) {
        return done(null, false, { 
          message: 'Access denied. Your email is not authorized.' 
        });
      }

      // Return user profile
      return done(null, {
        id: profile.id,
        displayName: profile.displayName,
        emails: profile.emails,
        photos: profile.photos
      });
    }
  ));
} else {
  console.warn('⚠️  Google OAuth credentials not configured. Authentication will not work.');
  console.warn('   Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file');
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

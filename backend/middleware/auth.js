const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
};

const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',') || [];
  const userEmail = req.user?.emails?.[0]?.value;

  if (!userEmail || !allowedEmails.includes(userEmail)) {
    return res.status(403).json({ 
      error: 'Access denied',
      message: 'Your email is not authorized to access admin features'
    });
  }

  next();
};

const isAuthenticatedOrPublic = (req, res, next) => {
  // For public routes, allow access without authentication
  if (req.method === 'GET') {
    return next();
  }
  
  // For other methods, require authentication
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',') || [];
  const userEmail = req.user?.emails?.[0]?.value;

  if (!userEmail || !allowedEmails.includes(userEmail)) {
    return res.status(403).json({ 
      error: 'Access denied',
      message: 'Your email is not authorized to access admin features'
    });
  }

  next();
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isAuthenticatedOrPublic
};

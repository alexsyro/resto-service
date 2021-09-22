module.exports = function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthorized) {
    console.log(`[${new Date()}]--[ACCESS]--[USER]-${req.session.user.login} GRANTED`);
    next();
  } else {
    console.log(`[${new Date()}]--[ACCESS]-- DENIED`);
    res.status(403).json({ error: 'UNAUTHORIZE ACCESS, PLEASE LOGIN' });
  }
};

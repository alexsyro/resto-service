module.exports = function isAuthenticated(req, res, next) {
  console.log('CHECK', req.session, req.session.user);
  if (req.session && req.session.isAuthenticated) {
    console.log(`[${new Date()}]--[ACCESS]--[USER]-${req.session.user.login} GRANTED`);
    next();
  } else {
    console.log(`[${new Date()}]--[ACCESS]-- DENIED`);
    res.status(403).json({ error: 'UNAUTHORIZE ACCESS, PLEASE LOGIN' });
  }
};

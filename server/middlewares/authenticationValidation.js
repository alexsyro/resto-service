module.exports = function isAuthenticated(req, res, next) {
  console.log('CHECK', req.session, req.session.isAuthorized);
  if (req.session.isAuthorized) {
    console.log(`[${new Date()}]--[LOGIN]--[USER]-${req.session.user.login} GRANTED`);
    next();
  } else {
    console.log(`[${new Date()}]--[LOGIN]-- DENIED`);
    res.status(403).json({ error: 'UNAUTHORIZE ACCESS, PLEASE LOGIN' });
  }
};

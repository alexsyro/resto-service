module.exports = function checkAdminRights(req, res, next) {
  if (req.session && req.session.user.isAdmin) {
    next();
  } else {
    res.status(409).json({ error: 'User is not an administrator' });
  }
};

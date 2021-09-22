module.exports = function checkStaff(req, res, next) {
  if (req.session && req.session.user.isStaff) {
    next();
  } else {
    res.status(409).json({ error: 'You shall not pass. Вы не можете просматривать информацию' });
  }
};

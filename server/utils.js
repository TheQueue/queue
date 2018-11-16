const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

const adminGateway = ( req, res, next) => {
  if(req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {loginRequired, adminGateway}

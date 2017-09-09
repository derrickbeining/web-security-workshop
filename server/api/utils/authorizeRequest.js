const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) return res.sendStatus(401)
  else next()
}

const mustBeSelfOrAdmin = (req, res, next) => {
  if (!req.user) return res.sendStatus(401)
  if (!req.user.isAdmin && req.user.id !== req.requestedUser.id) {
    return res.sendStatus(403)
  } else {
    next();
  }
}

const mustBeGuestOrAdmin = (req, res, next) => {
  if (req.user && !req.user.isAdmin) return res.sendStatus(403)
  else next()
}

const mustBeOwnerOrAdmin = (req, res, next) => {
  if (!req.user) return res.sendStatus(401)
  if (!req.user.isAdmin && req.user.id !== req.story.author_id) {
    return res.sendStatus(403)
  } else {
    next();
  }
}

const mustBeAttributedAuthorOrAdmin = (req, res, next) => {
  if (!req.user) return res.sendStatus(401)
  if (!req.user.isAdmin && req.user.id !== req.body.author_id) {
    res.status(403).end();
  } else {
    next();
  }
}

function selfOrAdmin (req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.isAdmin && req.user.id !== req.requestedUser.id) {
    res.status(403).end();
  } else {
    next();
  }
}

function admin (req, res, next) {
  // `req.user` was retrieved from postgres db via sequelize
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.isAdmin) {
    res.status(403).end();
  } else {
    next();
  }
}

function adminOrAuthor (req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.isAdmin && req.user.id !== req.story.author_id) {
    res.status(403).end();
  } else {
    next();
  }
}

function adminOrCreatingAuthor (req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.isAdmin && req.user.id !== req.body.author_id) {
    res.status(403).end();
  } else {
    next();
  }
}


module.exports = {
  mustBeLoggedIn,
  mustBeSelfOrAdmin,
  mustBeGuestOrAdmin,
  mustBeOwnerOrAdmin,
  mustBeAttributedAuthorOrAdmin
};

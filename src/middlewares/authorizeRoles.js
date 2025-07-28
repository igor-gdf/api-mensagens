function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.perfil)) {
      return res.status(403).json({ error: 'Acesso negado.' });
    }
    next();
  };
}

module.exports = authorizeRoles;
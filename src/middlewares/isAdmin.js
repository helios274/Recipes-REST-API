const isAdmin = (req, res, next) => {
  if (req.user.is_admin) next();
  else {
    res.statusCode = 401;
    throw new Error("Only admins are allowed to access this route");
  }
};

export default isAdmin;

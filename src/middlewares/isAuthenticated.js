const isAuthenticated = (req, res, next) => {
  if (req.user) next();
  else {
    res.statusCode = 403;
    throw new Error("User is not authenticated");
  }
};

export default isAuthenticated;

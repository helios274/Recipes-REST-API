const isAuthenticated = (req, res, next) => {
  req.user
    ? next()
    : res.status(401).send({ error: "User is not authenticated" });
};

export default isAuthenticated;

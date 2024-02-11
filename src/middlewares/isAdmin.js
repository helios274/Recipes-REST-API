const isAdmin = (req, res, next) => {
  req.user.is_admin
    ? next()
    : res
        .status(401)
        .send({ error: "Only admins are allowed to access this route" });
};

export default isAdmin;

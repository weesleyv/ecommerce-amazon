import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(user.toJSON(), config.JWT_SECRET, {
    expiresIn: "48h",
  });
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers)
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "invalid token" });
      }
      req.user = decode;
      next();
      return
    });
  } else {
    return res.status(401).send({message: "token is not supplied"})
  }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next()
    }
    res.status(401).send({messgae: "Not Admin"})
}

export { getToken, isAdmin, isAuth };

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const SECRET = process.env.SECRET;

  const { token } = req.body;

  const response = jwt.verify(token, SECRET);

  if (response) {
    next();
  }
};

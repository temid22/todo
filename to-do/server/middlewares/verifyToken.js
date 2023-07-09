import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).send(`Token not valid!`);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send(`You are not authenticated!`);
  }
};

export { verifyToken };

import jwt from "jsonwebtoken";

//Middleware function to check if Token is available and Valid
export function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  const token = authToken && authToken.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied, No Token provided" });

  jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ error: "Access denied, invalid token" });
    req.user = decoded;
    res.json(req.user);
  });
}

//Middleware function to check if user is authorized and if the user is also an admin
export function verifyTokenAndAdmin(req, res, next) {
  const authToken = req.headers.authorization;

  const token = authToken && authToken.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied, No Token provided" });

  jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ error: "Access denied, invalid token" });
    req.user = decoded;

    if (req.user.isAdmin !== true)
      return res
        .status(403)
        .json({ error: "Access denied, only admins can add or delete items" });
  });

  next();
}

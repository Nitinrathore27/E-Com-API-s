import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
  {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("No token found !");
    }
    try {
      const payload = jwt.verify(token, "q7aDjaf3TGPifz3rCNgjwqR1IZEOX5GV");
      req.userId = payload.userId;
    } catch (e) {
      return res.status(401).send("Invalid token");
    }
    next();
  }
};
export default jwtAuth;

import { UserModel } from "../features/user/user.model.js";
const basicAuthorizer = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("No authorization details found ! ");
  }

  //  Encoded Credentials
  const base64Credentials = authHeader.split(" ")[1];
  //  Decoded Credentials
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");
  const user = UserModel.getAll().find(
    (u) => u.email === username && u.password === password
  );

  if (user) {
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};

export default basicAuthorizer;

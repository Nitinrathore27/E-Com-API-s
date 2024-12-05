import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
export class UserController {
  static signUp(req, res) {
    const { name, email, password, role } = req.body;
    const user = UserModel.signUp(name, email, password, role);
    res.status(201).send(user);
  }
  static signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (user) {
      const token = jwt.sign(
        { email: email, userId: user.id },
        "q7aDjaf3TGPifz3rCNgjwqR1IZEOX5GV",
        { expiresIn: "1h" }
      );
      res.status(200).send(token);
    } else {
      res.status(401).send("Invalid credentials");
    }
  }
}

export class UserModel {
  constructor(name, email, password, role, id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
  static signUp(name, email, password, role) {
    const user = new UserModel(name, email, password, role, users.length + 1);
    users.push(user);
    return user;
  }
  static signIn(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    return user;
  }
  static getAll() {
    return users;
  }
}
var users = [
  {
    id: 1,
    name: "Seller user",
    email: "seller@ecom.com",
    password: "seller123",
    role: "Seller",
  },
  {
    id: 2,
    name: "Buyer user",
    email: "buyer@ecom.com",
    password: "buyer123",
    role: "Buyer",
  },
];

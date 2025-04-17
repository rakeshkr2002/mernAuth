import User from "../models/user.model.js";

class UserService {
  async create(req) {
    let newUser = await User.create(req.body);
    if (!newUser) {
      throw new Error("Error creating User!!");
    }
    return newUser;
  }

  async findUserById(id) {
    let existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("Error finding user");
    }
    return existingUser;
  }

  async findUserByEmail(req) {
    let { email } = req.body;
    if (!email) {
      throw new Error("Email field is missing!");
    }
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User doesnt exist with this mail id");
    }
    return existingUser;
  }

  async findAllUsers() {
    let users = await User.find();
    if(!users){
            throw new Error("No users found")
        }
    return users;
  }
}

let userInstance = new UserService();

export default userInstance;
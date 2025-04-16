import User from "../models/user.model.js";

class UserService {
     async create(req){
        let newUser = await User.create(req.body)
        return newUser;
     }

     async findUserByID(req){
        let {id} = req.params;

        let existingUser =  await User.findById(id);

        return existingUser;
     }

     async findUserByEmail(req){
        let  {email}= req.body
            let existingUser = await User.findOne({email})

            return existingUser;

     }

     async findAllUsers(){
        let users = await User.find();
        return users;
     }
}

let userInstance = new  UserService();

export default userInstance
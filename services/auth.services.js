import userInstance from "./user.services.js";

class AuthService{
    async registerUser(req){
        let newUser = await userInstance.create(req)
        
        return newUser;
    }

    async loginUser(req){
        let existingUser = await userInstance.findUserByEmail(req);
        return existingUser;
    }
}

export default new AuthService();
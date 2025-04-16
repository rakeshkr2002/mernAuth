import authInstance from "../services/auth.services.js";

export let register =async(req,res,next)=>{

    let newUser = await authInstance.registerUser(req)


    if (!newUser) {
        return res.status(400).json({
            messsage:"User not created"
        })
    }
   
    res.status(201).json(newUser);

}
export let login =async(req,res,next)=>{
    let  {password} = req.body

    let existingUser = await authInstance.loginUser(req)


    if (!existingUser || !(await existingUser.comparePassword(password,existingUser.password) )) {
        return res.status(400).json({
            messsage:"User not found"
        })
    }
   
    res.status(200).json(existingUser);
    
}
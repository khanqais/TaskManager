
const User=require('../Model/UserModel')
const Task=require('../Model/TaskModel')
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = user.createJWT();
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const register=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
         if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.create({ name, email, password });
        const token = user.createJWT();
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/");
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}






const getAllTask = async(req,res)=>{
    try { 
      const tasks= await Task.find({})
      res.status(200).json({tasks})
    } 
    catch (error) {
     res.status(500).json({ msg: error });
     }
}
const createTask=async(req,res)=>{
     
      try{      
           const task = await Task.create(req.body)
          res.status(201).json({ task });
      } 
      catch (error) {
          res.status(500).json({ msg: error });
      }
     
}
const getTask=async(req,res)=>{
     try {
          const {id:taskID}=req.params
          const task =await Task.findOne({_id:taskID})
          if(!task){
               return res.status(404).json({msg:`No task with id:${taskID}`})
          }
          res.status(200).json({task})
          
     } catch (error) {
          res.status(500).json({ msg: error });
      }

}
const deleteTask=async(req,res)=>{
     try {
          const {id:taskID}=req.params
          const task =await Task.findOneAndDelete({_id:taskID})
          if(!task)
               {
                    return res.status(404).json({msg:`No task with id:${taskID}`})
               }
               res.status(200).json({task})
          } catch (error) {
               res.status(500).json({ msg: error });
               
          }
          
     }
const updateTask=async(req,res)=>{
         try {
          const {id:taskID}=req.params; 
          const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
               new:true,
               runValidators:true,
          })
          
          if(!task)
               {
                    return res.status(404).json({msg:`No task with id:${taskID}`})
               }
               res.status(200).json({task})
          } catch (error) {
               res.status(500).json({ msg: error });
               
          }
     }
module.exports={
    getAllTask,createTask,getTask,deleteTask,updateTask,login,register
}
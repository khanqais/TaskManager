const express=require('express')
const router=express.Router();
const {login,register,getAllTask,createTask,getTask,deleteTask,updateTask}=require('../controller/Controller')


router.post('/login',login)
router.post('/register',register)
router.get('/getTask',getAllTask)
router.post('/create',createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



module.exports=router
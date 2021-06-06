
let checkRole = async(req,res,next)=>{
  if(req.user.role === "admin"){
    next()
  }
  else{
    return res.status(400).json("permission is denied")
  }
}

module.exports = {
  checkRole
}
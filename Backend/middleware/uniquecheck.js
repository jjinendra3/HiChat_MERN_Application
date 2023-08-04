const axios=require('axios');
const url=require('../FireBaseURL')
const checker=(req,res,next)=>{
    const {phone,email}=req.body;
  try {
    axios.get(url+"users.json")
            .then((resolve) => {
              let flag=1;
              for (key in resolve.data) {
                if (
                  phone === resolve.data[key].phone ||
                  email === resolve.data[key].email
                ) {
                  flag=0;
                  break;
                 
                }
              }
              if(!flag){
                  req.checker=1;
                  next();
                  return;
              }
              req.checker=0;
              next();
            })
  } catch (error) {
    req.checker=1;
   next();
   return;
  }
}
module.exports=checker;
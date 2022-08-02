import User from "../models/User.js";
import { encrypt } from "./helpers/handleBCrypt.js";
import Payment from "../models/Payments.js";
import { sendMail } from "../librarys/emailer.js";

export const forcePasswordAdmin = async (req, res) => {
    const {email, password} = req.body;
  
    try {
      if(!email) return res.status(404).send("User not found");
      let defaultPassword = password || "defaultPassword";
  
      const passwordHash = await encrypt(defaultPassword);
  
      const userDB = await User.findOneAndUpdate({email},{
        password: passwordHash
      },{new: true,});
  
      if(!userDB) return res.status(404).send("User not found");
  
      return res.json({msg: "Password updated"})
    }catch (e) {
      return res.json({ msg: `Error 404 - ${e}` });
    }
  }

export const changeState = async (req, res) => {
  const { paymentId, state, userId } = req.body
  
  try{
    const user = await User.findById(userId)
    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, {state: state}, {new: true})
    if(!updatedPayment) return res.status(404).send("Payment not found") 
    updatedPayment.save()

    const updatePaymentHistory = user.paymentHistory.map(item => item._id.toString() === paymentId ? updatedPayment : item)      
    
    user.paymentHistory = updatePaymentHistory
    user.save()
  
 
  const paymentObjectEmail = updatedPayment.container.map(e => e.name)
  

  sendMail(user.email, user.username, null, paymentObjectEmail)

    return res.json(user)

  }catch(e){
    return res.json({ msg: `Error 404 - ${e}` });  
  }
}
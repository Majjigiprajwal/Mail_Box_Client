const User = require('../Models/user')
const Mail = require('../Models/mail')


exports.sendMail = async (req, res,next) => {
    
    try {
      const { recipient, subject, body } = req.body;
      const sender = req.user.id;
  
      const recipientId = await User.findOne({ email: recipient });
      if (!recipient) return res.status(400).json({messahe: 'Mail not found,Please enter valid Mail Address' });
  
      const newEmail = new Mail({
        sender,
        recipient: recipientId._id,
        subject,
        body
      });
  
      await newEmail.save();

      return res.status(201).json({success:true,message:'Mail Sent Successfully'});

    } catch (err) {
      console.error(err.message);
      return res.status(500).json({success:false,message:'Server error'});
    }
  };
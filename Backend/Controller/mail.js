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

  exports.getInbox = async (req, res) => {
    try {
      const emails = await Mail.find({ 
        recipient: req.user.id, 
        recipientTrash: false 
      })
        .sort({ sentAt: -1 })
        .populate('sender', 'name email');

        console.log('emails',emails)
        
      res.status(200).json({success: true, emails: emails});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  exports.getSentEmails = async (req, res) => {
    try {
      const emails = await Mail.find({ 
        sender: req.user.id,
        senderTrash: false
      })
        .sort({ sentAt: -1 })
        .populate('recipient', 'name email');
      res.status(200).json({success:true,emails:emails});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.markAsRead = async (req, res) => {
    try {
      const email = await Mail.findById(req.params.id);
      if (!email) return res.status(404).json({ msg: 'Email not found' });
      if (email.recipient.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
  
      email.read = true;
      await email.save();
      res.json(email);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  exports.markAsStarred = async (req, res) => {
    try {
      const { id } = req.params;
      const mail = await Mail.findById(id);
      console.log(id)
  
      if (!mail) {
        return res.status(404).json({ success: false, message: 'Mail not found' });
      }
  
      mail.starred = !mail.starred;
      await mail.save();
  
      res.status(200).json({ success: true, message: 'Mail starred status updated', mail });
    } catch (error) {
      console.error('Error in markAsStarred:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  exports.getMailById = async (req, res) => {
    try {
      const { id } = req.params;
      const mail = await Mail.findById(id);
  
      if (!mail) {
        return res.status(404).json({ success: false, message: 'Mail not found' });
      }
  

      if (!mail.read) {
        mail.read = true;
        await mail.save();
      }
  
      res.status(200).json({ success: true, mail });
    } catch (error) {
      console.error('Error in getMailById:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


  exports.deleteMail = async (req, res) => {
    try {
      const { id } = req.params;
      const mail = await Mail.findById(id);
  
      if (!mail) {
        return res.status(404).json({ success: false, message: 'Mail not found' });
      }
  
      if (mail.sender.toString() === req.user.id) {
        mail.senderTrash = true;
      } else if (mail.recipient.toString() === req.user.id) {
        mail.recipientTrash = true;
      } else {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this mail' });
      }
  
      await mail.save();
  
      res.status(200).json({ success: true, message: 'Mail moved to trash' });
    } catch (error) {
      console.error('Error in deleteMail:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


  exports.getStarred = async (req, res) => {

    try {
      const starredEmails = await Mail.find({
        $or: [
          { recipient: req.user.id, recipientTrash: false, starred: true },
          { sender: req.user.id, senderTrash: false, starred: true }
        ]
      })
      .sort({ sentAt: -1 })
      .populate('sender', 'name email')
      .populate('recipient', 'name email');
        
      res.status(200).json({success:true,emails:starredEmails});

    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  exports.getDeletedEmails = async (req, res) => {
    try {
      const deletedEmails = await Mail.find({
        $or: [
          { recipient: req.user.id, recipientTrash: true },
          { sender: req.user.id, senderTrash: true }
        ]
      })
      .sort({ sentAt: -1 })
      .populate('sender', 'name email')
      .populate('recipient', 'name email');
        
      res.status(200).json({success: true, emails: deletedEmails});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
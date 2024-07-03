const express = require('express');
const router = express.Router();
const mailController = require('../Controller/mail')
const auth = require('../Middleware/isAuth')


router.get('/',auth, mailController.getInbox);


router.get('/star',auth, mailController.getStarred);


router.get('/bin',auth, mailController.getDeletedEmails);


router.post('/:id/star',auth, mailController.markAsStarred);


router.get('/sentMails',auth, mailController.getSentEmails);


router.post('/sendMail',auth, mailController.sendMail);


router.delete('/:id',auth, mailController.deleteMail);


router.post('/:id/read',auth, mailController.markAsRead);




module.exports = router;
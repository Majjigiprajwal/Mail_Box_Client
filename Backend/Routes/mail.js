const express = require('express');
const router = express.Router();
const mailController = require('../Controller/mail')
const auth = require('../Middleware/isAuth')

// router.get('/', mailController.getAllMails);


// router.get('/:id', mailController.getMailById);


router.post('/sendMail',auth, mailController.sendMail);


// router.delete('/:id', mailController.deleteMail);


// router.patch('/:id/read', mailController.markAsRead);


// router.get('/search', mailController.searchMails);

module.exports = router;
const express = require('express');
const router = express.Router();
const MessagesController = require('../controller/MessagesController');
const { protect } = require('../middleware/AuthMiddleware');

// getData
// router.get('/', protect, MessagesController.getContactUser);
router.get('/:id', protect, MessagesController.getMessages);
router.post('/:id', protect, MessagesController.CreateMessage);
router.delete('/:id', protect, MessagesController.deleteMessage);

module.exports = router;
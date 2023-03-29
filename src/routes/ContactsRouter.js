const express = require('express');
const router = express.Router();
const ContactsController = require('../controller/ContactsController');
const { protect } = require('../middleware/AuthMiddleware');

// getData
router.get('/', protect, ContactsController.getContactUser);
router.post('/', protect, ContactsController.CreateContact);
router.delete('/:id', protect, ContactsController.deleteContact);

module.exports = router;
const express = require('express');
const router = express.Router();
const UsersRouter = require('./UsersRouter');
const ContactsRouter = require('./ContactsRouter');
const MessagesRouter = require('./MessagesRouter');

router.use('/user', UsersRouter);
router.use('/contact', ContactsRouter);
router.use('/message', MessagesRouter);

module.exports = router;
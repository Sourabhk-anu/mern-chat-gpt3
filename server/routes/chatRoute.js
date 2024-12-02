const express = require('express');
const chatRoute = express.Router();

const {createChat, getAllChats, addConversation, getConversation, deleteChat} = require('../controllers/chatController');
const authenticate = require('../middlewares/isAuth')

chatRoute.post('/new', authenticate, createChat);
chatRoute.get('/all', authenticate, getAllChats);
chatRoute.post('/:id', authenticate, addConversation);
chatRoute.get('/:id', authenticate, getConversation);
chatRoute.delete('/:id', authenticate, deleteChat);


module.exports = chatRoute;
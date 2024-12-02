const mongoose = require('mongoose')
const Chat = require('../models/chatModel')
const Conversation = require('../models/conversationModel')

const createChat = async (req, res) => {
  // console.log(req.user);
    // const userId = "66f77974ef564806b0da87fc";
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    console.log(userId);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const newChat = await Chat.create({
            userId: new mongoose.Types.ObjectId(userId),
        });
        res.status(201).json(newChat);
    } catch (error) {
        console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const getAllChats = async(req,res) => {

    // const userId = new mongoose.Types.ObjectId(req.user.userId);
    const userId = "66f77974ef564806b0da87fc";

    try {
      const chats = await Chat.find({userId: userId}).sort({
        createdAt: -1,
      });
      console.log(chats);
      res.json({chats});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

  const addConversation = async(req, res) => {
    try {
      const chat = await Chat.findById(req.params.id);

      if(!chat)
        return res.status(404).json({message: "No chat with this id"});

      const conversation = await Conversation.create({
        chat: chat._id,
        question: req.body.question,
        answer: req.body.answer,
      })

      const updatedChat = await Chat.findByIdAndUpdate(req.params.id, 
        {latestMessage: req.body.question},
        {new: true},
      );

      res.json({conversation, updatedChat});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

  const getConversation = async(req, res) => {
    try {
      const conversation = await Conversation.find({conversation: req.params._id});
      console.log(conversation);

      if(!conversation)
        return res.status(404).json({message: "No conversation with this id"});

      res.json({conversation});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }
  
  const deleteChat = async(req, res) => {
    try {
      const chat = await Chat.find(req.params._id);

      if(!chat)
        return res.status(404).json({message: "No chat with this id"});

      if(chat.user!==req.user._id)
        return res.status(403).json({message: "Unauthorized"});

      await Chat.deleteOne();

      res.json({message: "Chat deleted"});

    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

module.exports = {createChat, getAllChats, addConversation, getConversation, deleteChat};
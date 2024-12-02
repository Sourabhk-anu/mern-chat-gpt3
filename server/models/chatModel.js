const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    latestMessage: {
        type: String,
        default: "New Chat"
    },
},
{
    timestamps: true,
}
)

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
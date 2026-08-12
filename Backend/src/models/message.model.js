import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Message must belong to a chat']
    },
    content: {
      type: String,
      required: [true, 'Please provide message content'],
      trim: true,
      minlength: [1, 'Message content cannot be empty'],
      maxlength: [5000, 'Message content cannot exceed 5000 characters']
    },
    role: {
      type: String,
      enum: ['user', 'ai'],
      required: [true, 'Please specify the role of the message'],
      default: 'user'
    },
    tokens: {
      type: Object,
      default: {
        prompt: 0,
        completion: 0,
        total: 0
      }
    },
    metadata: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

// Index for faster queries
messageSchema.index({ chat: 1, createdAt: 1 });

const messageModel = mongoose.model('Message', messageSchema);

export default messageModel;

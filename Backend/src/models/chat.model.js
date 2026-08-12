import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Chat must belong to a user']
    },
    title: {
      type: String,
      required: [true, 'Please provide a chat title'],
      trim: true,
      maxlength: [100, 'Chat title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Index for faster queries
chatSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Chat', chatSchema);

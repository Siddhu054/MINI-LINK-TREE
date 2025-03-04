import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const linkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    unique: true,
    default: () => nanoid(8)  // Generate a unique 8-character code
  },
  icon: String,
  backgroundColor: String,
  textColor: String,
  clicks: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Link = mongoose.model('Link', linkSchema);

export default Link; 
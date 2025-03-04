import { Schema, model, Document } from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10);

export interface ILink extends Document {
  id: string;
  shortId: string;
  url: string;
  title?: string;
  clicks: number;
  userId: string;
  backgroundColor?: string;
  textColor?: string;
  createdAt: Date;
  updatedAt: Date;
}

const linkSchema = new Schema<ILink>({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid()
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  clicks: {
    type: Number,
    default: 0
  },
  userId: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#000000'
  }
}, {
  timestamps: true
});

const Link = model<ILink>('Link', linkSchema);

export default Link;

export type { Link };
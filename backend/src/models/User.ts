import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define interface for User methods
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define interface for User document
export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false  // Don't include password by default
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    // Ensure we have the password field
    if (!this.password) {
      const user = await (this.constructor as any).findById(this._id).select('+password');
      if (!user) return false;
      return bcrypt.compare(candidatePassword, user.password);
    }
    return bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Remove password from JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IUser>('User', userSchema); 
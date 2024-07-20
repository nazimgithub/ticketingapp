import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describe the properties
// that are required to create new user
interface UserAttribute {
  email: string;
  password: string;  
}

// An interface that describe the properties
// that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttribute): any;
}

// An interface that describe the properties
// that a User Document has
interface UserDoc extends mongoose.Document<any> {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
    // Delete password, version key and set common key for id from response
    toJSON: {
      transform(doc, ret) {
        ret.id = ret.__id;
        delete ret.__id;
        delete ret.password;
        delete ret.__v;
      }
    }
});

userSchema.pre('save', async function(done){
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttribute) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

const buildUser = (attrs: UserAttribute) => {
  return new User(attrs);  
};

export { User, buildUser };
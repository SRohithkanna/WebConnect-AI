import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    avatar: {
      type: String,
      default: '',
    },

    headline: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
    },

    website: {
      type: String,
      trim: true,
      default: '',
    },

    company: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
    },

    currentPosition: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
    },

    yearsOfExperience: {
      type: Number,
      min: 0,
      default: 0,
    },

    portfolio: {
      type: String,
      trim: true,
      default: '',
    },

    github: {
      type: String,
      trim: true,
      default: '',
    },

    linkedin: {
      type: String,
      trim: true,
      default: '',
    },

    twitter: {
      type: String,
      trim: true,
      default: '',
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    availability: {
      type: String,
      enum: [
        'Open to Work',
        'Open to Freelance',
        'Not Available',
      ],
      default: 'Open to Work',
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* -------------------------------- */
/* GENERATE USERNAME                */
/* -------------------------------- */

userSchema.pre('validate', async function (next) {
  if (this.username) {
    return next();
  }

  if (!this.name) {
    return next();
  }

  let baseUsername = this.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '')
    .substring(0, 20);

  if (!baseUsername) {
    baseUsername = 'user';
  }

  let username = baseUsername;
  let count = 1;

  while (
    await mongoose.models.User.exists({
      username,
      _id: { $ne: this._id },
    })
  ) {
    username = `${baseUsername}${count}`;
    count++;
  }

  this.username = username;

  next();
});

/* -------------------------------- */
/* PASSWORD HASHING                 */
/* -------------------------------- */

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

  next();
});

/* -------------------------------- */
/* PASSWORD COMPARISON               */
/* -------------------------------- */

userSchema.methods.comparePassword = async function (
  password
) {
  return bcrypt.compare(password, this.password);
};

/* -------------------------------- */
/* REMOVE PASSWORD FROM RESPONSE     */
/* -------------------------------- */

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
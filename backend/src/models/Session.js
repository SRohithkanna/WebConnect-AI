import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    refreshTokenHash: {
      type: String,
      required: true,
      select: false,
    },

    deviceName: {
      type: String,
      default: 'Unknown Device',
    },

    browser: {
      type: String,
      default: 'Unknown',
    },

    operatingSystem: {
      type: String,
      default: 'Unknown',
    },

    ipAddress: {
      type: String,
      default: '',
    },

    userAgent: {
      type: String,
      default: '',
    },

    lastActiveAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    isRevoked: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

sessionSchema.index({ user: 1, isRevoked: 1 });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
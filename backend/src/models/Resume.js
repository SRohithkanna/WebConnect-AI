import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    extractedText: {
      type: String,
      default: '',
    },

    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    analyzedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model(
  'Resume',
  resumeSchema
);

export default Resume;
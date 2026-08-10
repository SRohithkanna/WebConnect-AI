import mongoose from 'mongoose';

const roadmapItemSchema = new mongoose.Schema(
  {
    week: {
      type: Number,
      required: true,
      min: 1,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
  },
  {
    _id: false,
  }
);

const profileAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    backendScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    frontendScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    databaseScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    systemDesignScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    testingScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    devOpsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    placementReadiness: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    roadmap: {
      type: [roadmapItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

profileAnalysisSchema.index({
  user: 1,
  createdAt: -1,
});

const ProfileAnalysis = mongoose.model(
  'ProfileAnalysis',
  profileAnalysisSchema
);

export default ProfileAnalysis;
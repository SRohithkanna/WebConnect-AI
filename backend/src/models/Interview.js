import mongoose from 'mongoose';


// ---------------------------------------
// Interview Question Schema
// ---------------------------------------

const interviewQuestionSchema =
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
      },

      answer: {
        type: String,
        required: true,
      },

      category: {
        type: String,
      },
    },
    {
      _id: false,
    }
  );


// ---------------------------------------
// Interview Schema
// ---------------------------------------

const interviewSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },

      questions: {
        type: [interviewQuestionSchema],
        default: [],
      },

      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );


export default mongoose.model(
  'Interview',
  interviewSchema
);
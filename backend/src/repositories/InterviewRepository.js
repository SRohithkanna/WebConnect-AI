import Interview from '../models/Interview.js';


// ---------------------------------------
// Find interview by user
// ---------------------------------------

const findByUserId = async (userId) => {

  return Interview.findOne({
    user: userId,
  });

};


// ---------------------------------------
// Create or update interview
// ---------------------------------------

const createOrUpdate = async (
  userId,
  questions
) => {

  return Interview.findOneAndUpdate(
    {
      user: userId,
    },

    {
      user: userId,
      questions,
      generatedAt: new Date(),
    },

    {
      new: true,
      upsert: true,
    }
  );

};


export default {
  findByUserId,
  createOrUpdate,
};
import ProfileAnalysis from '../models/ProfileAnalysis.js';

const create = async (data) => {
  return ProfileAnalysis.create(data);
};

const findLatestByUserId = async (userId) => {
  return ProfileAnalysis.findOne({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

const findByUserId = async (
  userId,
  skip = 0,
  limit = 10
) => {
  return ProfileAnalysis.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit)
    .lean();
};

export default {
  create,
  findLatestByUserId,
  findByUserId,
};
import ProfileAnalysis from '../models/ProfileAnalysis.js';

const create = async (data) => {
  return ProfileAnalysis.create(data);
};

const findLatestByUserId = async (userId) => {
  return ProfileAnalysis.findOne({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .lean();
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

const countByUserId = async (userId) => {
  return ProfileAnalysis.countDocuments({
    user: userId,
  });
};

export default {
  create,
  findLatestByUserId,
  findByUserId,
  countByUserId,
};
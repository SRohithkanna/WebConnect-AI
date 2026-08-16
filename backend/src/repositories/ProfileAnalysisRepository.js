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

export default {
  create,
  findLatestByUserId,
};
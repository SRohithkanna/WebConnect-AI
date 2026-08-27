
import Resume from '../models/Resume.js';

const findByUserId = async (userId) => {
  return Resume.findOne({
    user: userId,
  });
};

const create = async (data) => {
  return Resume.create(data);
};

const updateByUserId = async (userId, data) => {
  return Resume.findOneAndUpdate(
    {
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteByUserId = async (userId) => {
  return Resume.findOneAndDelete({
    user: userId,
  });
};

export default {
  findByUserId,
  create,
  updateByUserId,
  deleteByUserId,
};
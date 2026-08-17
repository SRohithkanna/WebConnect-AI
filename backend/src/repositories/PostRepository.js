import Post from '../models/Post.js';

const create = async (data) => {
  return Post.create(data);
};

const findAll = async () => {
  return Post.find()
    .populate(
      'user',
      'name username'
    )
    .sort({
      createdAt: -1,
    })
    .lean();
};

const findById = async (postId) => {
  return Post.findById(postId)
    .populate(
      'user',
      'name username'
    )
    .lean();
};

const deleteById = async (postId) => {
  return Post.findByIdAndDelete(postId);
};

export default {
  create,
  findAll,
  findById,
  deleteById,
};
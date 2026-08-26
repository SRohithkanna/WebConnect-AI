import Comment from '../models/Comment.js';

const create = async (data) => {
  return Comment.create(data);
};

const findByPost = async (postId) => {
  return Comment.find({
    post: postId,
  })
    .populate('user', 'name username')
    .sort({
      createdAt: -1,
    });
};

const findById = async (commentId) => {
  return Comment.findById(commentId);
};

const deleteById = async (commentId) => {
  return Comment.findByIdAndDelete(commentId);
};

export default {
  create,
  findByPost,
  findById,
  deleteById,
};
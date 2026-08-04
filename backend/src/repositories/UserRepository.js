import User from '../models/User.js';

const create = async (payload) => {
  return User.create(payload);
};

const findByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email });

  if (includePassword) {
    query.select('+password');
  }

  return query;
};

const findByUsername = async (username) => {
  return User.findOne({ username });
};

const findById = async (id) => {
  return User.findById(id);
};

const existsByEmail = async (email) => {
  return User.exists({ email });
};

const existsByUsername = async (username) => {
  return User.exists({ username });
};

const updateLastLogin = async (userId) => {
  return User.findByIdAndUpdate(
    userId,
    {
      lastLoginAt: new Date(),
    },
    {
      new: true,
    }
  );
};

const findProfileById = async (userId) => {
  return User.findById(userId);
};

const updateProfile = async (userId, payload) => {
  return User.findByIdAndUpdate(
    userId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const updateAvatar = async (userId, avatarUrl) => {
  return User.findByIdAndUpdate(
    userId,
    {
      avatar: avatarUrl,
    },
    {
      new: true,
    }
  );
};


export default {
  create,
  findByEmail,
  findByUsername,
  findById,
  existsByEmail,
  existsByUsername,
  updateLastLogin,
  findProfileById,
  updateProfile,
  updateAvatar,
};
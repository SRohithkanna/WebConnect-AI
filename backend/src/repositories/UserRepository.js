import User from '../models/User.js';

const create = async (payload) => {
  return User.create(payload);
};

const findByEmail = async (
  email,
  includePassword = false
) => {
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

const updateProfile = async (
  userId,
  payload
) => {
  return User.findByIdAndUpdate(
    userId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const updateAvatar = async (
  userId,
  avatarUrl
) => {
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

/* -------------------------------- */
/* PUBLIC USER PROFILE FUNCTIONS    */
/* -------------------------------- */

const findAllPublicProfiles = async (
  currentUserId
) => {
  return User.find(
    {
      _id: {
        $ne: currentUserId,
      },
    }
  )
    .select(
      '_id name username avatar headline bio location company currentPosition yearsOfExperience portfolio github linkedin twitter skills interests availability'
    )
    .sort({
      createdAt: -1,
    });
};

const findPublicProfileById = async (
  userId
) => {
  return User.findById(userId).select(
    '_id name username avatar headline bio location company currentPosition yearsOfExperience portfolio github linkedin twitter skills interests availability createdAt'
  );
};

/* -------------------------------- */
/* GET ALL OTHER USERS               */
/* -------------------------------- */

const findAllDevelopers = async (currentUserId) => {
  const users = await User.find({
    _id: {
      $ne: currentUserId,
    },
  })
    .select(
      "_id name username email avatar headline bio location company currentPosition yearsOfExperience portfolio github linkedin twitter skills interests availability role createdAt"
    )
    .sort({
      createdAt: -1,
    });

  console.log("ALL USERS:", users);

  return users;
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
  findAllPublicProfiles,
  findPublicProfileById,
  findAllDevelopers,
};
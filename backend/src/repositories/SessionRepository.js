import Session from '../models/Session.js';

const create = async (payload) => {
  return Session.create(payload);
};

const findByRefreshTokenHash = async (refreshTokenHash) => {
  return Session.findOne({
    refreshTokenHash,
    isRevoked: false,
  }).select('+refreshTokenHash');
};

const findById = async (id) => {
  return Session.findById(id);
};

const findUserSessions = async (userId) => {
  return Session.find({
    user: userId,
    isRevoked: false,
  }).sort({
    lastActiveAt: -1,
  });
};

const revokeSession = async (sessionId) => {
  return Session.findByIdAndUpdate(
    sessionId,
    {
      isRevoked: true,
    },
    {
      new: true,
    }
  );
};

const revokeAllSessions = async (userId) => {
  return Session.updateMany(
    {
      user: userId,
      isRevoked: false,
    },
    {
      isRevoked: true,
    }
  );
};

const updateLastActive = async (sessionId) => {
  return Session.findByIdAndUpdate(
    sessionId,
    {
      lastActiveAt: new Date(),
    }
  );
};

const deleteExpiredSessions = async () => {
  return Session.deleteMany({
    expiresAt: {
      $lt: new Date(),
    },
  });
};

export default {
  create,
  findByRefreshTokenHash,
  findById,
  findUserSessions,
  revokeSession,
  revokeAllSessions,
  updateLastActive,
  deleteExpiredSessions,
};
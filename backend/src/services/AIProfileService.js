import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';
import ProfileAnalysisRepository from '../repositories/ProfileAnalysisRepository.js';

import GeminiProvider from '../ai/providers/GeminiProvider.js';

import buildProfileAnalysisPrompt from '../ai/prompts/profileAnalyzer.prompt.js';

import parseProfileAnalysis from '../ai/parsers/profileAnalysis.parser.js';

const analyzeProfile = async (userId) => {
  const profile = await UserRepository.findProfileById(userId);

  if (!profile) {
    const error = new Error('User not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  const profileData = {
    name: profile.name,
    username: profile.username,
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    company: profile.company,
    currentPosition: profile.currentPosition,
    yearsOfExperience: profile.yearsOfExperience,
    portfolio: profile.portfolio,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    skills: profile.skills,
    interests: profile.interests,
  };

  const prompt = buildProfileAnalysisPrompt(profileData);

  const aiResponse =
    await GeminiProvider.generateContent(prompt);

  let analysis;

  try {
    analysis = parseProfileAnalysis(aiResponse);
  } catch (error) {
    const parsingError = new Error(
      'Failed to parse AI analysis response.'
    );

    parsingError.statusCode =
      StatusCodes.INTERNAL_SERVER_ERROR;

    throw parsingError;
  }

  const savedAnalysis =
    await ProfileAnalysisRepository.create({
      user: userId,
      ...analysis,
    });

  return savedAnalysis;
};

const getLatestAnalysis = async (userId) => {
  const analysis =
    await ProfileAnalysisRepository.findLatestByUserId(
      userId
    );

  if (!analysis) {
    const error = new Error(
      'No profile analysis found.'
    );

    error.statusCode = StatusCodes.NOT_FOUND;

    throw error;
  }

  return analysis;
};

const getAnalysisHistory = async (
  userId,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [analyses, total] = await Promise.all([
    ProfileAnalysisRepository.findByUserId(
      userId,
      skip,
      limit
    ),

    ProfileAnalysisRepository.countByUserId(userId),
  ]);

  return {
    analyses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPreviousPage: page > 1,
    },
  };
};

export default {
  analyzeProfile,
  getLatestAnalysis,
  getAnalysisHistory,
};
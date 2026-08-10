import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';

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

  const aiResponse = await GeminiProvider.generateContent(prompt);

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

  return analysis;
};

export default {
  analyzeProfile,
};
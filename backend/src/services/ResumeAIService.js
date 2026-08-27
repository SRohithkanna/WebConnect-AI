import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';
import ResumeRepository from '../repositories/ResumeRepository.js';

import GeminiProvider from '../ai/providers/GeminiProvider.js';

import buildResumeAnalysisPrompt from '../ai/prompts/resumeAnalyzer.prompt.js';
import parseResumeAnalysis from '../ai/parsers/resumeAnalysis.parser.js';


const analyzeResume = async (userId) => {
  const profile =
    await UserRepository.findProfileById(userId);

  if (!profile) {
    const error = new Error('User not found.');
    error.statusCode = StatusCodes.NOT_FOUND;

    throw error;
  }

  const resume =
    await ResumeRepository.findByUserId(userId);

  if (!resume) {
    const error = new Error(
      'Resume not found. Please upload a resume first.'
    );

    error.statusCode = StatusCodes.NOT_FOUND;

    throw error;
  }

  if (!resume.extractedText) {
    const error = new Error(
      'Resume text is not available for analysis.'
    );

    error.statusCode = StatusCodes.BAD_REQUEST;

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

  const prompt = buildResumeAnalysisPrompt({
    profile: profileData,
    resumeText: resume.extractedText,
  });

  const aiResponse =
    await GeminiProvider.generateContent(prompt);

  let analysis;

  try {
    analysis =
      parseResumeAnalysis(aiResponse);
  } catch (error) {
    const parsingError = new Error(
      'Failed to parse AI resume analysis response.'
    );

    parsingError.statusCode =
      StatusCodes.INTERNAL_SERVER_ERROR;

    throw parsingError;
  }

  const updatedResume =
    await ResumeRepository.updateByUserId(
      userId,
      {
        aiAnalysis: analysis,
        analyzedAt: new Date(),
      }
    );

  return updatedResume;
};


const getResumeAnalysis = async (userId) => {
  const resume =
    await ResumeRepository.findByUserId(userId);

  if (!resume) {
    const error = new Error(
      'Resume not found.'
    );

    error.statusCode = StatusCodes.NOT_FOUND;

    throw error;
  }

  if (!resume.aiAnalysis) {
    const error = new Error(
      'Resume has not been analyzed yet.'
    );

    error.statusCode = StatusCodes.NOT_FOUND;

    throw error;
  }

  return {
    aiAnalysis: resume.aiAnalysis,
    analyzedAt: resume.analyzedAt,
  };
};


export default {
  analyzeResume,
  getResumeAnalysis,
};
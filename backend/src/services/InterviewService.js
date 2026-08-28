import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';
import ResumeRepository from '../repositories/ResumeRepository.js';
import InterviewRepository from '../repositories/InterviewRepository.js';

import GeminiProvider from '../ai/providers/GeminiProvider.js';

import buildInterviewPrompt from '../ai/prompts/interview.prompt.js';


// ---------------------------------------
// Generate interview questions
// ---------------------------------------

const generateInterviewQuestions = async (userId) => {

  // ---------------------------------------
  // Get profile
  // ---------------------------------------

  const profile =
    await UserRepository.findProfileById(userId);

  if (!profile) {
    const error =
      new Error('User not found.');

    error.statusCode =
      StatusCodes.NOT_FOUND;

    throw error;
  }


  // ---------------------------------------
  // Get resume
  // ---------------------------------------

  const resume =
    await ResumeRepository.findByUserId(userId);

  if (!resume) {
    const error =
      new Error(
        'Please upload your resume before generating interview questions.'
      );

    error.statusCode =
      StatusCodes.BAD_REQUEST;

    throw error;
  }


  if (!resume.extractedText) {
    const error =
      new Error(
        'Resume text is not available.'
      );

    error.statusCode =
      StatusCodes.BAD_REQUEST;

    throw error;
  }


  // ---------------------------------------
  // Profile data
  // ---------------------------------------

  const profileData = {
    name: profile.name,
    username: profile.username,
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    company: profile.company,
    currentPosition: profile.currentPosition,
    yearsOfExperience:
      profile.yearsOfExperience,
    portfolio: profile.portfolio,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    skills: profile.skills,
    interests: profile.interests,
  };


  // ---------------------------------------
  // Build prompt
  // ---------------------------------------

  const prompt =
    buildInterviewPrompt({
      profile: profileData,
      resumeText: resume.extractedText,
    });


  // ---------------------------------------
  // Gemini
  // ---------------------------------------

  const aiResponse =
    await GeminiProvider.generateContent(
      prompt
    );


  // ---------------------------------------
  // Parse JSON
  // ---------------------------------------

  let result;

  try {

    let cleanedResponse =
      aiResponse.trim();

    // Remove markdown code block
    if (
      cleanedResponse.startsWith(
        '```json'
      )
    ) {
      cleanedResponse =
        cleanedResponse
          .replace(/^```json/, '')
          .replace(/```$/, '')
          .trim();
    }

    result =
      JSON.parse(cleanedResponse);

  } catch (error) {

    const parsingError =
      new Error(
        'Failed to generate interview questions.'
      );

    parsingError.statusCode =
      StatusCodes.INTERNAL_SERVER_ERROR;

    throw parsingError;
  }


  // ---------------------------------------
  // Validate response
  // ---------------------------------------

  if (
    !result.questions ||
    !Array.isArray(result.questions)
  ) {

    const error =
      new Error(
        'Invalid interview question response.'
      );

    error.statusCode =
      StatusCodes.INTERNAL_SERVER_ERROR;

    throw error;
  }


  // ---------------------------------------
  // SAVE INTERVIEW TO DATABASE
  // ---------------------------------------

  const savedInterview =
    await InterviewRepository.createOrUpdate(
      userId,
      result.questions
    );


  // ---------------------------------------
  // Return saved interview
  // ---------------------------------------

  return savedInterview;
};


// ---------------------------------------
// Get latest saved interview
// ---------------------------------------

const getLatestInterview = async (userId) => {

  const interview =
    await InterviewRepository.findByUserId(
      userId
    );


  if (!interview) {

    const error =
      new Error(
        'No interview questions found.'
      );

    error.statusCode =
      StatusCodes.NOT_FOUND;

    throw error;
  }


  return interview;
};


export default {
  generateInterviewQuestions,
  getLatestInterview,
};
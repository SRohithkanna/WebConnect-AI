import fs from 'fs/promises';
import path from 'path';

import ResumeRepository from '../repositories/ResumeRepository.js';
import extractTextFromPdf from '../utils/pdfParser.js';

const uploadResume = async (userId, file) => {
  if (!file) {
    const error = new Error(
      'Resume file is required.'
    );

    error.statusCode = 400;

    throw error;
  }

  if (file.mimetype !== 'application/pdf') {
    await fs.unlink(file.path).catch(() => {});

    const error = new Error(
      'Only PDF resumes are allowed.'
    );

    error.statusCode = 400;

    throw error;
  }

  const extractedText =
    await extractTextFromPdf(file.path);

  if (!extractedText) {
    await fs.unlink(file.path).catch(() => {});

    const error = new Error(
      'Unable to extract text from the resume.'
    );

    error.statusCode = 400;

    throw error;
  }

  const existingResume =
    await ResumeRepository.findByUserId(userId);

  if (existingResume) {
    await fs
      .unlink(existingResume.filePath)
      .catch(() => {});
  }

  const resumeData = {
    user: userId,
    originalFileName: file.originalname,
    filePath: file.path,
    fileType: file.mimetype,
    fileSize: file.size,
    extractedText,
    aiAnalysis: null,
    analyzedAt: null,
  };

  if (existingResume) {
    return ResumeRepository.updateByUserId(
      userId,
      resumeData
    );
  }

  return ResumeRepository.create(resumeData);
};

const getResume = async (userId) => {
  return ResumeRepository.findByUserId(userId);
};

const deleteResume = async (userId) => {
  const resume =
    await ResumeRepository.findByUserId(userId);

  if (!resume) {
    return null;
  }

  await fs.unlink(resume.filePath).catch(() => {});

  return ResumeRepository.deleteByUserId(userId);
};

export default {
  uploadResume,
  getResume,
  deleteResume,
};
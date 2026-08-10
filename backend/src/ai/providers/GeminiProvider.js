import { GoogleGenerativeAI } from '@google/generative-ai';

import env from '../../config/env.js';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-3.6-flash',
});

const generateContent = async (prompt) => {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

export default {
  generateContent,
};
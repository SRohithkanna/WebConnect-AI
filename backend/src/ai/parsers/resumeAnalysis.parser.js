const parseResumeAnalysis = (response) => {
  if (!response || typeof response !== 'string') {
    throw new Error('Invalid AI response.');
  }

  let cleanedResponse = response.trim();

  if (cleanedResponse.startsWith('```')) {
    cleanedResponse = cleanedResponse
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
  }

  let parsed;

  try {
    parsed = JSON.parse(cleanedResponse);
  } catch (error) {
    throw new Error('AI response is not valid JSON.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid resume analysis structure.');
  }

  return {
    summary:
      typeof parsed.summary === 'string'
        ? parsed.summary
        : '',

    skills:
      Array.isArray(parsed.skills)
        ? parsed.skills
        : [],

    strengths:
      Array.isArray(parsed.strengths)
        ? parsed.strengths
        : [],

    weaknesses:
      Array.isArray(parsed.weaknesses)
        ? parsed.weaknesses
        : [],

    missingSkills:
      Array.isArray(parsed.missingSkills)
        ? parsed.missingSkills
        : [],

    experienceSummary:
      Array.isArray(parsed.experienceSummary)
        ? parsed.experienceSummary
        : [],

    projectSummary:
      Array.isArray(parsed.projectSummary)
        ? parsed.projectSummary
        : [],

    resumeSuggestions:
      Array.isArray(parsed.resumeSuggestions)
        ? parsed.resumeSuggestions
        : [],

    interviewFocusAreas:
      Array.isArray(parsed.interviewFocusAreas)
        ? parsed.interviewFocusAreas
        : [],
  };
};

export default parseResumeAnalysis;
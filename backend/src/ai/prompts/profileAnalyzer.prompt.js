const buildProfileAnalysisPrompt = (profile) => {
  return `
You are a Senior Staff Software Engineer.

Analyze the following developer profile.

Developer Profile:

${JSON.stringify(profile, null, 2)}

Return ONLY valid JSON.

Use exactly this structure.

{
  "overallScore": number,
  "backendScore": number,
  "frontendScore": number,
  "databaseScore": number,
  "systemDesignScore": number,
  "testingScore": number,
  "devOpsScore": number,
  "placementReadiness": number,
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "roadmap": []
}

Do not return markdown.

Do not return explanations.

Only JSON.
`;
};

export default buildProfileAnalysisPrompt;
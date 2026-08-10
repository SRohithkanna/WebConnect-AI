const parseProfileAnalysis = (response) => {
  const cleaned = response
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid AI response format.');
  }

  const scoreFields = [
    'overallScore',
    'backendScore',
    'frontendScore',
    'databaseScore',
    'systemDesignScore',
    'testingScore',
    'devOpsScore',
    'placementReadiness',
  ];

  for (const field of scoreFields) {
    if (
      typeof parsed[field] !== 'number' ||
      parsed[field] < 0 ||
      parsed[field] > 100
    ) {
      throw new Error(
        `Invalid AI score: ${field}`
      );
    }
  }

  if (!Array.isArray(parsed.strengths)) {
    throw new Error('Invalid AI strengths format.');
  }

  if (!Array.isArray(parsed.weaknesses)) {
    throw new Error('Invalid AI weaknesses format.');
  }

  if (!Array.isArray(parsed.recommendations)) {
    throw new Error(
      'Invalid AI recommendations format.'
    );
  }

  if (!Array.isArray(parsed.roadmap)) {
    throw new Error('Invalid AI roadmap format.');
  }

  const roadmap = parsed.roadmap.map(
    (item, index) => {
      if (typeof item === 'string') {
        return {
          week: index + 1,
          goal: item,
        };
      }

      if (
        typeof item === 'object' &&
        item !== null &&
        typeof item.week === 'number' &&
        typeof item.goal === 'string'
      ) {
        return {
          week: item.week,
          goal: item.goal,
        };
      }

      throw new Error(
        'Invalid roadmap item format.'
      );
    }
  );

  return {
    overallScore: parsed.overallScore,
    backendScore: parsed.backendScore,
    frontendScore: parsed.frontendScore,
    databaseScore: parsed.databaseScore,
    systemDesignScore: parsed.systemDesignScore,
    testingScore: parsed.testingScore,
    devOpsScore: parsed.devOpsScore,
    placementReadiness: parsed.placementReadiness,

    strengths: parsed.strengths,
    weaknesses: parsed.weaknesses,
    recommendations: parsed.recommendations,

    roadmap,
  };
};

export default parseProfileAnalysis;
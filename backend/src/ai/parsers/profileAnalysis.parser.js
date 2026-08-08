const parseProfileAnalysis = (response) => {
  const cleaned = response
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(cleaned);
};

export default parseProfileAnalysis;
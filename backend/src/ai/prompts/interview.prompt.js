const buildInterviewPrompt = ({
  profile,
  resumeText,
}) => {
  return `
You are a Senior Software Engineer and technical interviewer.

You are preparing a developer for software engineering
placement interviews.

Analyze the developer's profile and resume below.

PROFILE:
${JSON.stringify(profile, null, 2)}

RESUME:
${resumeText}

Generate interview questions that are specifically relevant
to this developer.

Focus on:

1. Resume-based questions
2. Questions about projects mentioned in the resume
3. Technical questions based on the technologies and skills
   actually present in the resume/profile
4. Software engineering fundamentals
5. System design questions appropriate for the developer's level
6. Behavioral questions relevant to software engineering
7. Follow-up questions an interviewer might ask

IMPORTANT:

- Do NOT assume technologies that are not present.
- Questions should be realistic placement interview questions.
- Include questions that an interviewer could actually ask.
- Answers should be clear and suitable for an interview.
- Answers should not be excessively long.
- Answers should help the developer understand how to respond.
- Include approximately 15-20 questions.
- Mix different categories.

Return ONLY valid JSON.

Do not return markdown.
Do not wrap the response in \`\`\`json.
Do not add explanations outside the JSON.

Return exactly this structure:

{
  "questions": [
    {
      "question": "Tell me about yourself.",
      "answer": "A suitable interview answer.",
      "category": "Behavioral"
    }
  ]
}

Rules:

- questions must be an array of objects.
- Every object must contain:
  - question
  - answer
  - category
- question must be a string.
- answer must be a string.
- category must be one of:
  - "Resume"
  - "Project"
  - "Technical"
  - "System Design"
  - "Behavioral"
- Do not include duplicate questions.
- Return ONLY the JSON object.
`;
};

export default buildInterviewPrompt;
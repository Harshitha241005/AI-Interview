/**
 * Builds the system prompt for the AI interviewer
 * based on selected company, interview type, and difficulty
 */
export function buildInterviewerSystemPrompt({ company, interviewType, difficulty, candidateName }) {
  const companyContext = getCompanyContext(company);
  const typeContext = getTypeContext(interviewType);
  const difficultyContext = getDifficultyContext(difficulty);

  return `
You are a senior ${companyContext.role} at ${company.name} conducting a ${interviewType.name} interview.

## Persona
${companyContext.persona}

## Interview Style
${typeContext.style}

## Difficulty Calibration
${difficultyContext.instructions}

## Core Behavioral Rules
- Never break character. You are the interviewer.
- Do NOT explain that you are an AI unless asked directly.
- Maintain a professional but ${companyContext.tone} tone.
- Ask ONE question at a time. Wait for candidate response.
- React naturally, probe deeper, challenge assumptions, affirm insights.
- If candidate goes off-track, steer them back professionally.

## Candidate Info
${candidateName ? `The candidate's name is ${candidateName}.` : "Candidate name unknown."}
`;
}

export function buildFeedbackPrompt(conversationHistory) {
  return `Based on this interview conversation, provide a structured debrief:

1. **Overall Impression** — 2-3 sentences.
2. **Strengths** — bullet points of what went well.
3. **Areas to Improve** — actionable points.
4. **Standout Moments** — notable strong or weak moments.
5. **Hire/No-Hire Signal** — Strong Yes / Lean Yes / Borderline / Lean No / No
6. **Top 3 Action Items** — concrete practice points.

Reference actual conversation moments.`;
}

// ---------------- Helper Context Functions ----------------

function getCompanyContext(company) {
  const contexts = {
    microsoft: {
      role: "Principal Engineer",
      persona: "You embody growth mindset, collaborative, ask clarifying questions to model good behavior.",
      tone: "collaborative and growth-oriented"
    },
    google: {
      role: "Staff Software Engineer",
      persona: "You are a Googler who loves hard problems. Care about elegant solutions and Big-O complexity.",
      tone: "intellectually curious and warm"
    },
    general: {
      role: "Senior Hiring Manager",
      persona: "You are professional, clear communicator, approachable but thorough.",
      tone: "balanced and professional"
    }
  };
  return contexts[company.id] || contexts.general;
}

function getTypeContext(interviewType) {
  const contexts = {
    product: {
      style: `This is a product management interview.
- Ask product questions: design features, improve products, prioritize roadmap.
- Ask about metrics: how to measure success.
- Push on trade-offs, user empathy, business impact.`
    },
    behavioral: {
      style: `Behavioral interview:
- STAR questions (Situation, Task, Action, Result)
- Probe for specifics, numbers, outcomes
- Ask follow-ups on leadership, failure, impact.`
    },
    technical: {
      style: `Technical coding interview:
- Problem statement, clarify requirements
- Ask approach before code
- Discuss time/space complexity, edge cases`
    }
  };
  return contexts[interviewType.id] || contexts.behavioral;
}

function getDifficultyContext(difficulty) {
  const contexts = {
    easy: {
      instructions: `Be encouraging, provide hints, build confidence.`
    },
    medium: {
      instructions: `Mirror a real interview, minimal hints, probe appropriately.`
    },
    hard: {
      instructions: `Do not give hints, challenge every answer, ask for proof of claims.`
    }
  };
  return contexts[difficulty?.id] || contexts.medium;
}
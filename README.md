# ◈ InterviewAI — AI-Powered Interview Practice

A full-featured interview preparation app powered by Claude (Anthropic). Practice with a realistic AI interviewer that adapts to your target company and interview type.

---

## Features

- **12 Target Companies** — Google, Meta, Amazon, Netflix, OpenAI, Stripe, Goldman Sachs, McKinsey & more
- **8 Interview Types** — Technical Coding, System Design, Behavioral, Case Interview, PM, ML, Finance, Leadership
- **3 Difficulty Levels** — Warmup, Standard, Rigorous
- **Streaming Responses** — Real-time interviewer replies with streaming
- **Post-Interview Feedback** — AI-generated debrief with Hire/No-Hire signal
- **Quick Action Buttons** — Request hints, repeat questions, move on
- **Session Timer** — Track elapsed time per session

---

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Copy `.env.example` to `.env` and add your Anthropic API key:
```bash
cp .env.example .env
```
Then edit `.env`:
```
REACT_APP_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

> You can also enter your API key directly in the app UI — it's stored in localStorage.

### 3. Get an API Key
Sign up at [console.anthropic.com](https://console.anthropic.com) to get your free API key.

### 4. Run the App
```bash
npm start
```
Visit `http://localhost:3000`

---

## Project Structure

```
ai-interview-assistant/
├── public/
│   └── index.html              # HTML shell with Google Fonts
├── src/
│   ├── styles/
│   │   └── global.css          # CSS variables & base styles
│   ├── utils/
│   │   ├── interviewData.js    # Companies, interview types, difficulties
│   │   └── promptBuilder.js    # System prompt construction logic
│   ├── hooks/
│   │   └── useInterviewSession.js  # Core interview session state & API calls
│   ├── components/
│   │   ├── Message.jsx         # Chat message bubble
│   │   ├── Message.css
│   │   ├── FeedbackModal.jsx   # Post-interview debrief modal
│   │   └── FeedbackModal.css
│   ├── pages/
│   │   ├── SetupPage.jsx       # Company/type/difficulty selection UI
│   │   ├── SetupPage.css
│   │   ├── InterviewPage.jsx   # Live interview chat interface
│   │   └── InterviewPage.css
│   ├── App.js                  # Root component, routing logic
│   └── index.js                # React entry point
├── .env.example
├── package.json
└── README.md
```

---

## How It Works

1. **Setup** — Select your target company, interview type, and difficulty
2. **Interview** — The AI takes on the persona of a senior interviewer at that company, with company-specific style and focus areas
3. **Feedback** — After ending, receive a structured debrief with strengths, weaknesses, and a Hire/No-Hire signal

### Prompt Architecture

The `promptBuilder.js` utility constructs a detailed system prompt that:
- Sets the interviewer persona (role, company culture, tone)
- Defines interview style per type (coding, behavioral, case, etc.)
- Calibrates difficulty (hint frequency, pushback level)
- Includes behavioral guardrails (stay in character, one question at a time, etc.)

---

## Customization

### Add a New Company
In `src/utils/interviewData.js`, add an entry to `COMPANIES` array and a matching context in `promptBuilder.js`'s `getCompanyContext()` function.

### Add a New Interview Type
In `src/utils/interviewData.js`, add to `INTERVIEW_TYPES`. Add matching style instructions in `getTypeContext()` in `promptBuilder.js`.

### Change the Model
In `src/hooks/useInterviewSession.js`, update the `model` field in both API calls.

---

## Tech Stack

- **React 18** — UI framework
- **Anthropic Claude API** — claude-sonnet-4-20250514 with streaming
- **CSS Custom Properties** — theming without a CSS framework
- **No state management library** — custom React hooks only

---

## Notes on API Usage

- Each message turn makes one API call
- The feedback modal makes one additional API call
- Sessions are NOT saved between browser refreshes
- API key is stored in `localStorage` for convenience — clear it manually if needed

---

## License
MIT

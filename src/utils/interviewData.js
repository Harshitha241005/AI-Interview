export const COMPANIES = [
  {
    id: "google",
    name: "Google",
    logo: "G",
    color: "#4285F4",
    description: "FAANG giant known for algorithmic rigor and system design",
    difficulty: "Hard",
    traits: ["Strong focus on algorithms & data structures", "System design for scale", "Googliness culture fit", "4-6 rounds typically"]
  },
  {
    id: "meta",
    name: "Meta",
    logo: "M",
    color: "#0081FB",
    description: "Moves fast, values impact and product intuition",
    difficulty: "Hard",
    traits: ["Coding focused", "Behavioral STAR method", "Product sense", "Speed matters"]
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "A",
    color: "#FF9900",
    description: "Leadership Principles are the backbone of every interview",
    difficulty: "Medium-Hard",
    traits: ["14 Leadership Principles", "Bar raiser process", "Ownership & bias for action", "Heavy behavioral component"]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "Ms",
    color: "#00A4EF",
    description: "Growth mindset culture, collaborative and thorough",
    difficulty: "Medium",
    traits: ["Growth mindset valued", "Collaborative problem solving", "Design & architecture", "Inclusive culture questions"]
  },
  {
    id: "apple",
    name: "Apple",
    logo: "🍎",
    color: "#555555",
    description: "Secretive, detail-oriented, product perfectionism",
    difficulty: "Hard",
    traits: ["Deep domain expertise", "Attention to detail", "Product quality focus", "Secrecy & confidentiality"]
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "N",
    color: "#E50914",
    description: "High performance culture, freedom with responsibility",
    difficulty: "Very Hard",
    traits: ["Keeper test culture", "Senior-level bar for all", "Judgment over process", "Compensation transparency"]
  },
  {
    id: "startup",
    name: "Early-Stage Startup",
    logo: "🚀",
    color: "#7c6af7",
    description: "Scrappy, generalist, cultural alignment is everything",
    difficulty: "Variable",
    traits: ["Generalist mindset", "Ownership & initiative", "Fast iteration", "Equity discussions"]
  },
  {
    id: "goldman",
    name: "Goldman Sachs",
    logo: "GS",
    color: "#7399C6",
    description: "Elite finance, prestige, technical finance knowledge",
    difficulty: "Very Hard",
    traits: ["Finance fundamentals", "Market knowledge", "Fit within banking culture", "Technical quant questions"]
  },
  {
    id: "mckinsey",
    name: "McKinsey",
    logo: "McK",
    color: "#003366",
    description: "Case interviews, structured thinking, top-tier consulting",
    difficulty: "Very Hard",
    traits: ["Case interview framework", "Structured problem solving", "MECE thinking", "Client-ready communication"]
  },
  {
    id: "openai",
    name: "OpenAI",
    logo: "⬡",
    color: "#10a37f",
    description: "AI-first, mission-driven, cutting-edge research culture",
    difficulty: "Hard",
    traits: ["Deep ML/AI knowledge", "Research or engineering track", "Mission alignment", "Frontier thinking"]
  },
  {
    id: "stripe",
    name: "Stripe",
    logo: "S",
    color: "#635BFF",
    description: "Developer-obsessed, writing culture, high craft bar",
    difficulty: "Hard",
    traits: ["Writing samples may be required", "API design sensibility", "User empathy", "High craft standards"]
  },
  {
    id: "general",
    name: "General / Other",
    logo: "◈",
    color: "#4ade80",
    description: "Standard interview without company-specific framing",
    difficulty: "Medium",
    traits: ["Balanced technical/behavioral", "Standard best practices", "Adaptable to your target", "Good for warm-up"]
  }
];

export const INTERVIEW_TYPES = [
  {
    id: "technical",
    name: "Technical Coding",
    icon: "💻",
    description: "LeetCode-style DSA problems with live coding discussion",
    duration: "45-60 min",
    tags: ["Algorithms", "Data Structures", "Problem Solving"]
  },
  {
    id: "system_design",
    name: "System Design",
    icon: "🏗️",
    description: "Design scalable distributed systems under constraints",
    duration: "45-60 min",
    tags: ["Architecture", "Scalability", "Trade-offs"]
  },
  {
    id: "behavioral",
    name: "Behavioral / HR",
    icon: "🤝",
    description: "STAR-format questions about past experiences and soft skills",
    duration: "30-45 min",
    tags: ["Leadership", "Conflict", "Teamwork"]
  },
  {
    id: "case",
    name: "Case Interview",
    icon: "📊",
    description: "Business problem-solving for consulting & strategy roles",
    duration: "30-45 min",
    tags: ["Frameworks", "Market Sizing", "Strategy"]
  },
  {
    id: "product",
    name: "Product Management",
    icon: "🎯",
    description: "Product sense, prioritization, and go-to-market strategy",
    duration: "45-60 min",
    tags: ["Product Sense", "Metrics", "Roadmap"]
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: "🧠",
    description: "ML concepts, model design, and applied AI problem solving",
    duration: "45-60 min",
    tags: ["ML Theory", "Model Design", "Math"]
  },
  {
    id: "finance",
    name: "Finance / Quant",
    icon: "📈",
    description: "Financial modeling, valuation, and quantitative reasoning",
    duration: "45-60 min",
    tags: ["Valuation", "Markets", "Quant"]
  },
  {
    id: "leadership",
    name: "Leadership & Strategy",
    icon: "🌐",
    description: "Senior-level questions on strategy, vision, and org impact",
    duration: "45-60 min",
    tags: ["Vision", "Stakeholders", "Culture"]
  }
];

export const DIFFICULTY_LEVELS = [
  { id: "easy", name: "Warmup", description: "Gentle intro, confidence-building", color: "#4ade80" },
  { id: "medium", name: "Standard", description: "Realistic interview pace", color: "#fbbf24" },
  { id: "hard", name: "Rigorous", description: "Push your limits, no hand-holding", color: "#f87171" }
];

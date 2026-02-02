const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Initialize Groq
const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

exports.chatWithAI = async (req, res) => {
  const { message, context } = req.body;

  const prompt = `
You are an Academic Planner Assistant.
Your role is to help students with:
- time management
- study scheduling
- productivity tips
- motivation

User Context:
${JSON.stringify(context)}

User Message:
${message}

Provide concise, helpful, and motivational advice.
`;

  // 1. Try Gemini first
  if (genAI) {
    try {
      console.log("Attempting Gemini...");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return res.json({ reply: response.text(), provider: 'gemini' });
    } catch (error) {
      console.error("Gemini failed:", error.message);
      // Fall through to Groq if Gemini fails
    }
  }

  // 2. Try Groq as fallback
  if (groq) {
    try {
      console.log("Attempting Groq...");
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
      });
      return res.json({
        reply: chatCompletion.choices[0]?.message?.content || "No response from Groq",
        provider: 'groq'
      });
    } catch (error) {
      console.error("Groq failed:", error.message);
    }
  }

  // 3. Hard fallback if both fail or aren't configured
  return res.json({
    reply: "Staying organized is key. Break your tasks into smaller goals and track your progress daily to stay motivated.",
    provider: 'default'
  });
};

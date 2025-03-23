import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_OPEN_AI;

if (!apiKey) {
  throw new Error(
    "API key is missing or empty. Please provide a valid API key."
  );
}

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

function formatResponse(content: string): string {
  return content.replace(/\n/g, "<br>");
}

export function Response() {
  // Simple string instead of reactive object (which is Vue-specific)
  let chatContent = "";

  async function getResponse(query: string): Promise<string> {
    chatContent = "";
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional painting service quote generator. Provide concise, summarized responses with clear cost estimates, material requirements, and timeframes. Always include a fixed estimate at the beginning of your response in this exact format: 'FIXED_ESTIMATE: $X,XXX'. Then format the rest of your response in clearly labeled sections: 'Estimated Cost Range', 'Materials Needed', 'Timeline', and 'Recommendations'. Keep your response brief and direct."
        },
        {
          role: "user",
          content: query
        }
      ],
      model: "allam-2-7b",
      temperature: 0.6,
      max_completion_tokens: 600,
      top_p: 0.95,
      stream: true,
      stop: null,
    });

    let fullResponse = "";
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      chatContent += formatResponse(content);
    }
    
    return fullResponse;
  }

  return {
    chatContent,
    getResponse,
  };
}
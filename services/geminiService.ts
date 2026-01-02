import { GoogleGenAI } from "@google/genai";
import { SYSTEM_CONTEXT, CHATBOT_CONTEXT } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStrategicAdvice = async (
  userQuery: string,
  additionalContext: string = ""
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using gemini-3-pro-preview for deep reasoning as requested
    const modelId = "gemini-3-pro-preview";
    
    // Combining system context with specific runtime data
    const fullPrompt = `
      ${SYSTEM_CONTEXT}
      
      Additional Context Provided:
      ${additionalContext}

      User Query:
      ${userQuery}

      Please provide a comprehensive, strategic response. Structure your answer with clear headings, analysis, and actionable steps.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: fullPrompt,
      config: {
        // Enforcing Thinking Mode with High Budget for complex reasoning
        thinkingConfig: {
          thinkingBudget: 32768, // Max for Gemini 3 Pro
        },
        // Explicitly NOT setting maxOutputTokens as per instructions to allow full thinking output
      },
    });

    if (response.text) {
      return response.text;
    }
    
    throw new Error("No text returned from Gemini.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
        return `Error generating advice: ${error.message}`;
    }
    return "An unexpected error occurred while consulting the AI Advisor.";
  }
};

export const quickAnalysis = async (dataPayload: string): Promise<string> => {
  try {
    const ai = getClient();
    // Using flash for quicker, less intensive tasks
    const modelId = "gemini-3-flash-preview"; 

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Analyze this data briefly and give 3 key bullet points:\n${dataPayload}`,
    });

    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Quick Analysis Error:", error);
    return "Analysis failed.";
  }
};

export const getChatbotResponse = async (history: {role: string, content: string}[], message: string): Promise<string> => {
  try {
    const ai = getClient();
    const modelId = "gemini-3-flash-preview"; // Fast model for chat

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: CHATBOT_CONTEXT,
      },
      history: history.map(h => ({
        role: (h.role === 'assistant' || h.role === 'model') ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm not sure how to help with that.";
  } catch (error) {
    console.error("Chatbot Error:", error);
    return "I am currently offline. Please try again later.";
  }
}
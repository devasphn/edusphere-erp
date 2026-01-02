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
  const ai = getClient();
  
  // Strategy: Try the powerful Pro model first. 
  // If it hits a quota limit (429), fallback to the Flash model.
  const primaryModel = "gemini-3-pro-preview";
  const fallbackModel = "gemini-3-flash-preview";

  const fullPrompt = `
    ${SYSTEM_CONTEXT}
    
    Additional Context Provided:
    ${additionalContext}

    User Query:
    ${userQuery}

    Please provide a comprehensive, strategic response. Structure your answer with clear headings, analysis, and actionable steps.
  `;

  try {
    // Attempt 1: Gemini 3 Pro (Deep Thinking)
    const response = await ai.models.generateContent({
      model: primaryModel,
      contents: fullPrompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 16384, // Reduced slightly to try and fit quota better
        },
      },
    });

    if (response.text) return response.text;
    throw new Error("Empty response from Pro model");

  } catch (error: any) {
    // Check for Quota Exceeded (429) or Service Unavailable (503)
    if (error.message?.includes("429") || error.message?.includes("Quota") || error.status === 429) {
      console.warn(`Primary model (${primaryModel}) quota exceeded. Falling back to ${fallbackModel}.`);
      
      try {
        // Attempt 2: Gemini 3 Flash (Standard Speed, High Availability)
        const fallbackResponse = await ai.models.generateContent({
          model: fallbackModel,
          contents: fullPrompt,
          config: {
            // Flash models often handle thinking budgets differently or not at all in preview,
            // so we disable explicit thinking budget to ensure high success rate.
            thinkingConfig: { thinkingBudget: 0 } 
          },
        });
        
        if (fallbackResponse.text) {
          return `(Note: Switched to High-Speed Model due to traffic)\n\n${fallbackResponse.text}`;
        }
      } catch (fallbackError) {
        console.error("Fallback model also failed:", fallbackError);
        return "System is currently experiencing very high traffic. Please try again in 1 minute.";
      }
    }
    
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
    const modelId = "gemini-3-flash-preview"; 

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

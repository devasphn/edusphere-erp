import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { STRATEGIC_CONTEXT, CHATBOT_CONTEXT } from "../constants";
import { db } from "./database";

// ==========================================
// TOOL DEFINITIONS (The "API" the AI can call)
// ==========================================

const getSchoolStatsTool: FunctionDeclaration = {
  name: "getSchoolStats",
  description: "Get the current total counts of students, teachers, revenue, and attendance.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

const searchStudentTool: FunctionDeclaration = {
  name: "searchStudent",
  description: "Search for a specific student by name to get their details (GPA, Grade, Fees).",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The name of the student to search for.",
      },
    },
    required: ["name"],
  },
};

const searchTeacherTool: FunctionDeclaration = {
  name: "searchTeacher",
  description: "Search for teachers by name or subject.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: "The teacher's name or the subject they teach (e.g., 'Physics').",
      },
    },
    required: ["query"],
  },
};

// ==========================================
// TOOL IMPLEMENTATIONS (The "Database" Logic)
// ==========================================

const tools = {
  getSchoolStats: () => {
    return db.getStats();
  },
  searchStudent: (args: { name: string }) => {
    const student = db.getStudents().find(s => s.name.toLowerCase().includes(args.name.toLowerCase()));
    if (student) return student;
    return { error: "Student not found in the database." };
  },
  searchTeacher: (args: { query: string }) => {
    const term = args.query.toLowerCase();
    const teachers = db.getTeachers().filter(t => 
      t.name.toLowerCase().includes(term) || 
      t.subject.toLowerCase().includes(term)
    );
    if (teachers.length > 0) return teachers;
    return { error: "No teachers found matching that query." };
  }
};

// ==========================================
// AI CLIENT SETUP
// ==========================================

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey });
};

// ==========================================
// EXPORTED FUNCTIONS
// ==========================================

export const generateStrategicAdvice = async (
  userQuery: string,
  additionalContext: string = ""
): Promise<string> => {
  const ai = getClient();
  const primaryModel = "gemini-3-pro-preview";
  const fallbackModel = "gemini-3-flash-preview";

  const fullPrompt = `
    ${STRATEGIC_CONTEXT}
    
    EXECUTIVE SUMMARY DATA:
    ${additionalContext}

    USER STRATEGIC QUERY:
    ${userQuery}
  `;

  try {
    const response = await ai.models.generateContent({
      model: primaryModel,
      contents: fullPrompt,
      config: { thinkingConfig: { thinkingBudget: 16384 } },
    });
    return response.text || "No response generated.";
  } catch (error: any) {
    // Fallback logic for 429 errors
    if (error.message?.includes("429") || error.status === 429) {
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: fallbackModel,
          contents: fullPrompt,
          config: { thinkingConfig: { thinkingBudget: 0 } },
        });
        return `(High Traffic Mode)\n\n${fallbackResponse.text}`;
      } catch (e) {
        return "System busy. Please try again later.";
      }
    }
    return "An unexpected error occurred.";
  }
};

export const getChatbotResponse = async (history: {role: string, content: string}[], message: string): Promise<string> => {
  const ai = getClient();
  const modelId = "gemini-3-flash-preview"; 

  try {
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: CHATBOT_CONTEXT,
        tools: [
            { functionDeclarations: [getSchoolStatsTool, searchStudentTool, searchTeacherTool] }
        ],
      },
      history: history.map(h => ({
        role: (h.role === 'assistant' || h.role === 'model') ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
    });

    // 1. Send user message
    let response = await chat.sendMessage({ message });
    
    // 2. Check if the model wants to call a function (Tool Use)
    const functionCalls = response.functionCalls;
    
    if (functionCalls && functionCalls.length > 0) {
        // The model wants data. Let's execute the functions.
        const parts = functionCalls.map(call => {
            const toolName = call.name as keyof typeof tools;
            const toolFunc = tools[toolName];
            let result;
            
            if (toolFunc) {
                result = toolFunc(call.args as any);
            } else {
                result = { error: "Function not found" };
            }

            return {
                functionResponse: {
                    id: call.id,
                    name: call.name,
                    response: { result }
                }
            };
        });

        // 3. Send the function results back to the model
        const finalResponse = await chat.sendMessage({ message: parts });
        return finalResponse.text || "I found the information but couldn't summarize it.";
    }

    // If no function call, just return the text
    return response.text || "I'm not sure how to help with that.";

  } catch (error) {
    console.error("Chatbot Error:", error);
    return "I am currently offline or experiencing high traffic.";
  }
};
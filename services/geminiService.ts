import { GoogleGenAI } from "@google/genai";
import { ActionType } from '../types';

// FIX: Removed explicit API key check to align with guideline assumptions.
// The API key is assumed to be configured in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (action: ActionType, inputs: { [key: string]: string }): string => {
  switch (action) {
    case ActionType.Outline:
      return `Act as a Content Outliner. Create a 10-chapter ebook outline on the topic: "${inputs.topic || 'your chosen topic'}". Each chapter should include key subtopics, potential examples to include, and a clear takeaway. Format it as a clear, structured writing roadmap.`;
    case ActionType.Draft:
      return `Act as a Drafting Assistant. Write the first draft of Chapter ${inputs.chapterNumber || 'X'} from the following outline point: "${inputs.outlinePoint || 'the provided outline point'}". The tone should be ${inputs.tone || 'professional'}. Keep the content focused and easy to expand upon later. Provide a solid foundation for the chapter.`;
    case ActionType.Enhance:
      return `Act as a Case Study Creator. Enhance the following chapter text by inserting two practical examples or mini case studies. The examples should make the concepts feel tangible, practical, and engaging for readers.

Chapter Text:
---
${inputs.chapterText || 'your chapter text'}
---`;
    case ActionType.Polish:
      return `Act as a Clarity Editor. Rewrite this chapter draft to improve its flow, clarity, and style. Ensure it reads smoothly, keeps the reader engaged, and maintains a consistent tone. Eliminate jargon and simplify complex sentences.

Chapter Draft:
---
${inputs.chapterText || 'your chapter text'}
---`;
    case ActionType.Design:
      return `Act as a Visual Content Strategist. For an ebook designed in ${inputs.designTool || 'a design tool'}, suggest specific formatting ideas for the content. Include suggestions for headings (H1, H2, H3), callout box styles (for quotes or key stats), bullet list formatting, and chapter summary sections. Provide a conceptual guide to make the ebook look polished and professional.`;
    case ActionType.Title:
      return `Act as a Title Generator. Generate 10 compelling ebook title and subtitle options for a book on the topic: "${inputs.topic || 'your chosen topic'}". The titles should be catchy, benefit-driven, and optimized for keyword relevance.`;
    default:
      throw new Error('Invalid action type');
  }
};

export const runAction = async (action: ActionType, inputs: { [key: string]: string }): Promise<string> => {
  const prompt = generatePrompt(action, inputs);
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI. Please check your connection or API key.");
  }
};
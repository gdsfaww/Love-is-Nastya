import { GoogleGenAI } from "@google/genai";
import { ROMANTIC_QUOTES } from "../constants";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Returns a random romantic quote instantly from the local collection.
 * Replaces the slow AI call to ensure immediate UI feedback.
 */
export const generateDailyLoveNote = async (day: number, name: string): Promise<string> => {
  // Use a simple random selection for instant results
  const randomIndex = Math.floor(Math.random() * ROMANTIC_QUOTES.length);
  return ROMANTIC_QUOTES[randomIndex];
};

export const getHintForQuest = async (dayContent: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Послушай свое сердце.";

  try {
    const prompt = `
      Пользователь (Анастасия) проходит романтический квест, подготовленный её мужем (Антоном).
      Текущее задание: "${dayContent}".
      Дай кокетливую, любящую подсказку на русском языке, которая подтолкнет её в нужном направлении, не раскрывая сюрприза.
      Максимум 15 слов.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Подумай о том, где мы делимся нашими тихими моментами.";
  } catch (e) {
    return "Вспомни, где мы проводим наши утра.";
  }
};
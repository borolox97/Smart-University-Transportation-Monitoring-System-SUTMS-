
import { GoogleGenAI } from "@google/genai";
import { Message, Bus, Route, Stop } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTransportAssistantResponse = async (
  messages: Message[],
  buses: Bus[],
  routes: Route[],
  stops: Stop[]
) => {
  const model = 'gemini-3-flash-preview';
  
  // Format context for the AI
  const context = `
    You are the SUTMS (Smart University Transportation Monitoring System) Assistant.
    Current System Data:
    Routes: ${routes.map(r => `${r.name} (ID: ${r.id})`).join(', ')}
    Stops: ${stops.map(s => s.name).join(', ')}
    Active Buses: ${buses.map(b => `Bus ${b.id} on ${routes.find(r => r.id === b.routeId)?.name}, Next Stop ID: ${b.nextStopId}, Occupancy: ${b.occupancy}%`).join('\n')}
    
    Current Objective: Help students find the best bus, estimate arrival times, and provide general transportation advice for the university campus.
    Keep answers concise, professional, and helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: messages.map(m => ({ 
        role: m.role === 'assistant' ? 'model' : 'user', 
        parts: [{ text: m.content }] 
      })),
      config: {
        systemInstruction: context,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently offline. Please check the live map for bus locations.";
  }
};

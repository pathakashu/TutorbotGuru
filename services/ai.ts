
import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Ask Tutorbot a question with conversation history and student profile context.
 */
export async function askTutor(
  question: string, 
  history: { role: 'user' | 'model', text: string }[], 
  profile: any,
  lessonContext?: string
) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are "Tutorbot Guru", a wise, patient, and encouraging teacher for a rural Indian student named ${profile.name}.
  
  Context:
  - Language: ${profile.preferredLanguage} (ALWAYS respond in this language if it's an Indian regional language).
  - Grade: ${profile.grade}
  - Board: ${profile.board}
  - Environment: Rural/Semi-urban India.
  
  Response Style:
  - Use simple, local analogies (e.g., farming, local festivals, cricket, village markets).
  - Follow the NCERT/State Board curriculum guidelines.
  - Structure with Markdown:
    ### 📖 Pathshala (Concept)
    ### 💡 Udaharan (Example)
    ### 🎯 Saar (Key Takeaway)
  - Encourage the student with "Shabash!" or "Bahut Achhe!" in their language.
  - Use bold text for key terms in both English and ${profile.preferredLanguage}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: question }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
      },
    });

    return response.text || "Main abhi samajh nahi pa raha hoon. Kripya phir se puchein.";
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}

/**
 * Generates an AI-based progress report and improvement tips.
 */
export async function analyzeProgress(profile: any, recentLessons: any[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `You are "Tutorbot Guru Analysis Module". Analyze the student's progress and provide 3 highly personalized improvement tips.
  
  Student Data:
  - Name: ${profile.name}
  - XP: ${profile.points}
  - Streak: ${profile.streak} days
  - Completed Lessons: ${profile.completedLessons.length}
  - Recent Topics: ${recentLessons.map(l => l.title).join(', ')}
  - Language: ${profile.preferredLanguage}
  
  Requirements:
  1. Respond in ${profile.preferredLanguage}.
  2. Use "### 💪 Aapki Shakti (Strength)" for what they are doing well.
  3. Use "### 🎯 Sudhar ke Kshetra (Improvement Area)" for what needs work.
  4. Use "### 🚀 Guru ka Challenge (Guru's Challenge)" for a specific next step.
  5. Keep it motivational and concise.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Analyze my progress and give me advice.',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Progress Analysis Error:", error);
    return null;
  }
}

export async function speakText(text: string, voice: string = 'Kore'): Promise<AudioBuffer | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const bytes = decode(base64Audio);
    return await decodeAudioData(bytes, audioCtx, 24000, 1);
  } catch (error) { return null; }
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

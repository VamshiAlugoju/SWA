import { GoogleGenerativeAI, } from "@google/generative-ai"
import { GoogleAIFileManager } from "@google/generative-ai/server";
const apiKey = import.meta.env.VITE_GENAIKEY

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function executePrompt(prompt: string, responseType: "array" | "obj") {
    try {
        const startIdxMatcher = responseType === "array" ? '[' : '{'
        const endIdxMatcher = responseType === "array" ? ']' : '}'

        const result = await model.generateContent(prompt);
        console.log(result.response.text())
        const startIdx = result.response.text().indexOf(startIdxMatcher);
        const lastIdx = result.response.text().lastIndexOf(endIdxMatcher);
        const data = JSON.parse(result.response.text().substring(startIdx, lastIdx + 1))
        return Promise.resolve(data)
    } catch (err) {
        return Promise.reject(err)
    }
}


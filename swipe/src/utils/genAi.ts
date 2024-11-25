import { GoogleGenerativeAI, } from "@google/generative-ai"
import { GoogleAIFileManager } from "@google/generative-ai/server";
const apiKey = ""

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

export async function executePromptWithFile(file: File, prompt: string) {
    try {

        const fileArr = await file.arrayBuffer()

        // Step 1: Upload the file directly (pass the File object)


        // Upload the file and specify a display name.
        const uploadResponse = await fileManager.uploadFile("fileArr", {
            mimeType: file.type,
            displayName: file.name,
        });

        console.log("File uploaded successfully. File ID:", uploadResponse);

        // Step 2: Process the uploaded file with the AI model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Use Gemini or another model
        });

        // const response = await model.generateText({
        //     fileId: uploadResponse.fileId, // Use the file ID from the upload response
        //     instructions: "Extract and summarize key details from the uploaded PDF.",
        // });

        // console.log("Response from GenAI:", response.text);
    } catch (error) {
        console.error("Error processing the file:", error);
    }
}


export async function testPrompt(file: File) {
    try {
        const str = "https://asset.cloudinary.com/dagfskjyi/403c7bd4a58bf8d6ec01c6cdd020a21e"
        // Upload the file and specify a display name.
        const uploadResponse = await fileManager.uploadFile(str, {
            mimeType: "application/jpg",
            displayName: 'tempfile.jpg',
        });
        // Step 2: Process the uploaded file with the AI model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Use Gemini or another model
        });

        const result = await model.generateContent([
            "Tell me about this image.",
            {
                fileData: {
                    fileUri: uploadResponse.file.uri,
                    mimeType: uploadResponse.file.mimeType,
                },
            },
        ]);
        console.log(result.response.text());

        console.log("Response from GenAI:", result.response.text());
    } catch (errs) {
        console.log(errs)
    }
}
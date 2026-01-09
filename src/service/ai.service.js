const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  try {
    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: `
          generate a single line caption for the images.
          caption should be short and concise.
          you can use hashtags and emojis in the caption.
          generate aesthetic caption.
        `,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error?.error?.code || error.message);
    return null;
  }
}

module.exports = generateCaption;

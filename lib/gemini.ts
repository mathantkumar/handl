export type SummaryType = "bullet-points" | "short-paragraph" | "detailed";

export const generateGeminiContent = async (text: string, key: string, promptType: SummaryType | string) => {
    let prompt = "";

    const predefinedPrompts: Record<string, string> = {
        "bullet-points": "Summarize this document into 5 key bullet points. Be concise.",
        "short-paragraph": "Write a 3-sentence executive summary of this document.",
        "detailed": "Provide a detailed summary of this document, organized by sections."
    };

    // If promptType matches a key, use it; otherwise treat it as a custom prompt (e.g. for JSON extraction)
    if (predefinedPrompts[promptType]) {
        prompt = predefinedPrompts[promptType];
    } else {
        prompt = promptType;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: `${prompt}\n\nDocument Text:\n${text.substring(0, 10000)}` }] }]
        })
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || 'API Key Invalid or Quota Exceeded');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
};

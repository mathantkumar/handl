import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // 1. Get the Key securely (Server-side only)
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Server Misconfigured: Missing API Key' }, { status: 500 });
        }

        // 2. Parse the User's Request
        const { text } = await req.json();
        if (!text) return NextResponse.json({ error: 'No text provided' }, { status: 400 });

        // 3. Call Google Gemini (Server to Server)
        const prompt = `
      Analyze the following document and return a JSON object.
      JSON Schema:
      {
        "title": "Short title",
        "core_message": "Executive summary (2 sentences)",
        "key_points": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
        "conclusion": "Final wrap-up"
      }
      Document text: ${text.substring(0, 15000)}
    `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error("Gemini API Error details:", errData);
            throw new Error('Gemini API Error');
        }

        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;

        // 4. Clean JSON and Return to Frontend
        const cleanJson = JSON.parse(rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());

        return NextResponse.json(cleanJson);

    } catch (error: any) {
        console.error("Server API Error:", error);
        return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
    }
}

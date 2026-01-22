import { NextRequest, NextResponse } from 'next/server';

// Use MyMemory Translation API (free, no API key required)
async function translateWithMyMemory(text: string, targetLang: string): Promise<string> {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|${targetLang}`
  );

  if (!response.ok) {
    throw new Error('Translation API request failed');
  }

  const data = await response.json();

  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || 'Translation failed');
  }

  return data.responseData.translatedText;
}

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang = 'en' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Handle array of texts
    if (Array.isArray(text)) {
      const translations = await Promise.all(
        text.map(async (t: string) => {
          if (!t || t.trim() === '') return '';
          return await translateWithMyMemory(t, targetLang);
        })
      );
      return NextResponse.json({ translated: translations });
    }

    // Handle single text
    const translated = await translateWithMyMemory(text, targetLang);
    return NextResponse.json({ translated });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}

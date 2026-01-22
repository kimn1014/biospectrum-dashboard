import { NextRequest, NextResponse } from 'next/server';
import translate from 'google-translate-api-x';

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
          const result = await translate(t, { to: targetLang });
          return result.text;
        })
      );
      return NextResponse.json({ translated: translations });
    }

    // Handle single text
    const result = await translate(text, { to: targetLang });
    return NextResponse.json({ translated: result.text });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}

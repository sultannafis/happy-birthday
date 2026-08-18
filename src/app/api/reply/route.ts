import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { rating, message, answers } = await req.json();

    const waNumber = process.env.WA_NUMBER;

    if (!waNumber) {
      return NextResponse.json(
        { error: 'WA Number not configured' },
        { status: 500 }
      );
    }

    // Susun pesan untuk dikirim ke WhatsApp
    let text = `Halo sayang! Aku udah isi balasannya nih:\n\n`;
    text += `*⭐️ Rating kebahagiaan:* ${rating} dari 5 bintang\n\n`;
    text += `*📋 Jawaban Pertanyaan:*\n`;

    if (answers && Array.isArray(answers)) {
      answers.forEach((ans, index) => {
        text += `${index + 1}. ${ans.q} -> *${ans.a}*\n`;
      });
    }

    text += `\n*💌 Pesan Spesial:*\n"${message}"\n\n`;
    text += `terimaaa kasihh yaaaa sayanggg🤍`;

    // Encode text untuk WhatsApp URL
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

    return NextResponse.json({ url: waUrl });
  } catch (error) {
    console.error('Error generating WA link:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

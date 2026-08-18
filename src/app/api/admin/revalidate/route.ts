import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    revalidatePath('/gallery');
    revalidatePath('/photobooth');

    return NextResponse.json({ success: true, revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ success: false, error: 'Error revalidating' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(res) {
  const data = await res.json();

  const transcript = await YoutubeTranscript.fetchTranscript(data.url);

  return NextResponse.json(transcript);
}

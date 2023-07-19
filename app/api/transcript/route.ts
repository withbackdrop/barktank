import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(res) {
  const data = await res.json();

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(data.url);

    return NextResponse.json(transcript);
  } catch (error) {
    return new Response('Could not find transcript for the provided video.', {
      status: 500,
    });
  }
}

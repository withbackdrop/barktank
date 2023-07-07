import { NextResponse } from 'next/server'

import {getResponseInitial} from "@/models/query/services/QueryService";

export async function POST(request: Request) {
    const data = await request.json();

    const {round} = data; // The current round the user is playing.

    //
    const transcript = ''; // Get transcript.

    /**
     * Idea:
     * See what round the user is in
     * Then call a function to handle that round
     */

    if (round === 1) {
        return await getResponseInitial(transcript)
    }

    // @todo Store conversation log

    return NextResponse.json(data)
}
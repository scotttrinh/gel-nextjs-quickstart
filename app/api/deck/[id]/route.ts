import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

import { getDeck } from "./get-deck.query";

interface GetDeckSuccessResponse {
  id: string;
  name: string;
  description: string | null;
  cards: {
    id: string;
    front: string;
    back: string;
  }[];
}

interface GetDeckErrorResponse {
  error: string;
}

type GetDeckResponse = GetDeckSuccessResponse | GetDeckErrorResponse;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<GetDeckResponse>> {
  const access_token = req.headers.get("Authorization")?.split(" ")[1];
  if (!access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: deckId } = await params;
  const deck = await getDeck(
    client.withGlobals({ access_token }),
    { deckId }
  );

  if (!deck) {
    return NextResponse.json(
      { error: `Deck (${deckId}) not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(deck);
}

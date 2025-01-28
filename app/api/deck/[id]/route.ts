import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

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
  const { id: deckId } = await params;
  const deck = await client.querySingle<GetDeckSuccessResponse>(
    `
      with deckId := <uuid>$deckId,
      select Deck {
        id,
        name,
        description,
        cards: {
          id,
          front,
          back,
        },
      } filter .id = deckId
    `,
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

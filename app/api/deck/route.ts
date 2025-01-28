import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

interface CreateDeckBody {
  name: string;
  description?: string;
  cards: { front: string; back: string }[];
}

interface CreateDeckResponse {
  id: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<CreateDeckResponse>> {
  // Tip: Consider using a tool like Zod to validate the request body
  const body = (await req.json()) as CreateDeckBody;
  const deck = await client.queryRequiredSingle<CreateDeckResponse>(
    `
with
  name := <str>$name,
  description := <optional str>$description,
  cards := enumerate(array_unpack(<array<tuple<front: str, back: str>>>$cards)),
  DECK := (
    insert Deck {
      name := name,
      description := description,
    }
  ),
  CARDS := (
    for card in cards
    insert Card {
      front := card.1.front,
      back := card.1.back,
      deck := (
        select DECK {
          @order := <int32>card.0,
        }
      ),
    }
  ),
select DECK;
    `,
    {
      name: body.name,
      description: body.description,
      cards: body.cards,
    }
  );

  return NextResponse.json(deck);
}

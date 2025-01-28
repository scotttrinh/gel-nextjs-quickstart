import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

import { createDeck } from "./create-deck.query";

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
  const deck = await createDeck(client, {
    name: body.name,
    description: body.description ?? null,
    cards: body.cards,
  });
  return NextResponse.json(deck);
}

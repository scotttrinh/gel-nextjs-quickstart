import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

import { createDeck } from "./create-deck.query";

interface CreateDeckBody {
  name: string;
  description?: string;
  cards: { front: string; back: string }[];
}

interface CreateDeckSuccessResponse {
  id: string;
}

interface CreateDeckErrorResponse {
  error: string;
}

type CreateDeckResponse = CreateDeckSuccessResponse | CreateDeckErrorResponse;

export async function POST(
  req: NextRequest
): Promise<NextResponse<CreateDeckResponse>> {
  // Tip: Consider using a tool like Zod to validate the request body
  const access_token = req.headers.get("Authorization")?.split(" ")[1];
  if (!access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as CreateDeckBody;
  const deck = await createDeck(client.withGlobals({ access_token }), {
    name: body.name,
    description: body.description ?? null,
    cards: body.cards,
  });
  return NextResponse.json(deck);
}

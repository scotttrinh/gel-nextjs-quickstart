import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

import { updateCard } from "./update-card.query";

interface UpdateCardBody {
  front: string;
  back: string;
}

interface UpdateCardSuccessResponse {
  id: string;
}

interface UpdateCardErrorResponse {
  error: string;
}

type UpdateCardResponse = UpdateCardSuccessResponse | UpdateCardErrorResponse;

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<UpdateCardResponse>> {
  const { id: cardId } = await params;
  const access_token = req.headers.get("Authorization")?.split(" ")[1];
  if (!access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as UpdateCardBody;
  const card = await updateCard(client.withGlobals({ access_token }), {
    cardId,
    front: body.front,
    back: body.back,
  });

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}

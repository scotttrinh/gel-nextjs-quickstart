import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

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
  const body = (await req.json()) as UpdateCardBody;
  const card = await client.querySingle<UpdateCardSuccessResponse>(
    `
      with
        cardId := <uuid>$cardId,
        front := <str>$front,
        back := <str>$back,
      update Card
      filter .id = cardId
      set {
        front := front,
        back := back,
      };
    `,
    { cardId, front: body.front, back: body.back }
  );

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}

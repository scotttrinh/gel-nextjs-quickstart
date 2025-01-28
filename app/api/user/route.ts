import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/gel";

import { createUser } from "./create-user.query";

interface CreateUserRequest {
  name: string;
}

interface CreateUserResponse {
  access_token: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateUserResponse>> {
  const { name } = (await request.json()) as CreateUserRequest;

  const access_token = await createUser(client, { name });

  return NextResponse.json({ access_token });
}

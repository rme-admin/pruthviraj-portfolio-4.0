import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getContent, saveContent, isValidContentType } from "@/lib/content";
import type { ContentType } from "@/types";

type RouteContext = { params: Promise<{ type: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { type } = await context.params;

  if (!isValidContentType(type)) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const data = await getContent(type as ContentType);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const authed = await verifySession();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await context.params;

  if (!isValidContentType(type)) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const data = await request.json();
    await saveContent(type as ContentType, data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}

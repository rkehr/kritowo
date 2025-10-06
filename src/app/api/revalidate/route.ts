import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-revalidate-secret");
    const path = req.headers.get("x-revalidate-path") || "/";

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    revalidatePath(path);

    return NextResponse.json({ revalidated: true, path });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { revalidated: false, error: message },
      { status: 500 },
    );
  }
}

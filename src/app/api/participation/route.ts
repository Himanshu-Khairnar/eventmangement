import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { addTeam } from "@/services/participation.service";

export async function POST(request: NextRequest) {
  try {
    console.log("Auth header:", request.headers.get("authorization"));
    await verifyAdmin(request);

    const body = await request.json();
    await addTeam(body.eventId, body.teamData);

    return NextResponse.json({ success: true });
  }catch (error) {
  console.error("REAL ERROR:", error);
  return NextResponse.json({ error: "Unauthorized or failed" }, { status: 403 });
}
}
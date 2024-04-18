import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

const companyIdData = "65fbd41cdccb0b09a7eca9d0";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];

export async function POST(request) {
  // CREATE INVOICE

  // CREATE/UPDATE MONTHLY INCOME

  // CREATE/UPDATE MONTHLY TOP CLIENTS

  // RESPONSE
  try {
    return NextResponse.json({ error: "Could not add canceled invoice!" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: `CANCELED_INVOICE_API_ERROR ${err}` }, { status: 500 });
  }
}

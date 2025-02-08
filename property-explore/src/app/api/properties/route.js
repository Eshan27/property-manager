import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDatabase() {
  if (!client.topology || !client.topology.isConnected()) await client.connect();
  return client.db("property-explorer");
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const properties = await db.collection("properties").find({}).toArray();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

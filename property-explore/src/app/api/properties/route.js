import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import prisma from "@/lib/db";

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

// using prisma

export async function POST(request) {
  try {
    // Parse JSON body
    const { name, city, owner, price, bedrooms, bathrooms, location } = await request.json();

    // Validate required fields
    if (!name || !city || !owner || !price || !bedrooms || !bathrooms || !location) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate numeric fields
    const parsedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    if (isNaN(parsedPrice)) {
      return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
    }

    // Create property in database
    const property = await prisma.property.create({
      data: {
        name,
        city,
        owner,
        price: parsedPrice,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        location: {
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
        },
      },
    });

    // Respond with success
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error adding property:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
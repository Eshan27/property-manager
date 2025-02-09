import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
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

export async function POST(request) {
  try {

    const session = await getServerSession(authOptions);  // Get the session

    // Check if the user is an admin
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { error: "You do not have permission to perform this action." },
        { status: 403 }
      );
    }

    const db = await connectToDatabase();
    const propertyData = await request.json();

    if (!propertyData.name || !propertyData.city || !propertyData.owner || !propertyData.price) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const parsedPrice = parseFloat(propertyData.price.replace(/[^0-9.-]+/g, ""));
    if (isNaN(parsedPrice)) {
      return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
    }

    propertyData.price = parsedPrice;
    propertyData.bedrooms = parseInt(propertyData.bedrooms);
    propertyData.bathrooms = parseInt(propertyData.bathrooms);

    const result = await db.collection("properties").insertOne(propertyData);

    return NextResponse.json({ success: true, propertyId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error adding property:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {

    const session = await getServerSession(authOptions);  // Get the session

    // Check if the user is an admin
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { error: "You do not have permission to perform this action." },
        { status: 403 }
      );
    }

    const db = await connectToDatabase();
    const { id, ...updatedData } = await request.json();

    const result = await db.collection("properties").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {

    const session = await getServerSession(authOptions);  // Get the session

    // Check if the user is an admin
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { error: "You do not have permission to perform this action." },
        { status: 403 }
      );
    }

    const db = await connectToDatabase();
    const { id } = await request.json();

    const result = await db.collection("properties").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}


// using prisma

// export async function POST(request) {
//   try {
//     // Parse JSON body
//     const body = await request.json();

//     // Log the incoming data
//     console.log("Received Data at Backend:", body);

//     const { bedrooms, bathrooms, name, city, owner, price } = body;

//     // Validate required fields
//     if (!name || !city || !owner || !price || !bedrooms || !bathrooms) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     // Validate numeric fields
//     const parsedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
//     if (isNaN(parsedPrice)) {
//       return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
//     }

//     console.log("Parsed Price:", parsedPrice);

//     // Create property in database
//     const property = await prisma.property.create({
//       data: {
//         name,
//         city,
//         owner,
//         price: parsedPrice,
//         bedrooms: parseInt(bedrooms),
//         bathrooms: parseInt(bathrooms),
//       },
//     });

//     // Respond with success
//     return NextResponse.json(property, { status: 201 });
//   } catch (error) {
//     console.error("Error adding property:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

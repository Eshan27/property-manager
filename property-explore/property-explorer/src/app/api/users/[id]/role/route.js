import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"  // Import your Prisma client
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request, context) {
    const { params } = context
    const { id } = params
    const { role } = await request.json()

    if (!["admin", "user"].includes(role)) {
        return NextResponse.json({ error: "Invalid role provided" }, { status: 400 })
    }

        // Verify the session and user role
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    try {
        // Update the user's role in the database
        const updatedUser = await prisma.user.update({
        where: { id: id },
        data: { role: role },
        })

        return NextResponse.json({ success: true, user: updatedUser })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

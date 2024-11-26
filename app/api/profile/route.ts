import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("認証して言いません", { status: 401 });
    }
    const response = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
}

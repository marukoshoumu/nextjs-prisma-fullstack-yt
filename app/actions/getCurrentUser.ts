import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return null;
    }
    const response = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    if (!decoded) return null;
    const { connectToDatabase } = await import("@/lib/mongodb");
    await connectToDatabase();
    const { default: User } = await import("@/lib/models/User");
    const user = await User.findById(decoded.id).select("-password");
    return user;
  } catch {
    return null;
  }
}

export async function requireAuth(role) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Unauthorized", status: 401 };
  }
  if (role && user.role !== role) {
    return { error: "Forbidden", status: 403 };
  }
  return { user };
}

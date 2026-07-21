import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateKey = `login:${ip}`;
    const { allowed, retryAfter } = checkRateLimit(rateKey);
    if (!allowed) {
      return Response.json(
        { error: `Too many login attempts. Try again in ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken(user);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return Response.json({ user });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

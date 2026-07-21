import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignup(body) {
  const errors = [];
  const { email, password, role, firstName, lastName, phone } = body;

  if (!email || !EMAIL_RE.test(email)) errors.push("Valid email is required");
  if (!password || password.length < 8) errors.push("Password must be at least 8 characters");
  if (!["sender", "driver"].includes(role)) errors.push("Role must be sender or driver");
  if (!firstName || firstName.trim().length < 1) errors.push("First name is required");
  if (!lastName || lastName.trim().length < 1) errors.push("Last name is required");
  if (!phone || phone.trim().length < 5) errors.push("Valid phone number is required");

  return errors;
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateKey = `signup:${ip}`;
    const { allowed, retryAfter } = checkRateLimit(rateKey);
    if (!allowed) {
      return Response.json(
        { error: `Too many signup attempts. Try again in ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    await connectToDatabase();
    const body = await request.json();
    const { email, password, role, firstName, lastName, phone, company, carrierType } = body;

    const validationErrors = validateSignup(body);
    if (validationErrors.length > 0) {
      return Response.json({ error: validationErrors.join(". ") }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Response.json({ error: "Email already registered" }, { status: 400 });
    }

    const userData = {
      email: email.toLowerCase(),
      password,
      role,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
    };
    if (role === "sender" && company) userData.company = company;
    if (role === "driver" && carrierType) userData.carrierType = carrierType;

    const user = await User.create(userData);
    const token = signToken(user);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

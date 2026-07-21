import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import User from "@/lib/models/User";

export async function POST(request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return Response.json({ error: "Current and new password are required" }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return Response.json({ error: "New password must be at least 8 characters" }, { status: 400 });
    }

    await connectToDatabase();
    const fullUser = await User.findById(user._id);
    const isMatch = await fullUser.comparePassword(currentPassword);
    if (!isMatch) {
      return Response.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    fullUser.password = newPassword;
    await fullUser.save();

    return Response.json({ message: "Password updated successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

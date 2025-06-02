import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { User } from "@/types/User";
import { Avatar } from "@/types/Avatar";
import { userApi } from "@/services/api";

const EditProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tutor");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  useEffect(() => {
    const fetchUserAndAvatars = async () => {
      // simulate current user fetch from localStorage or API
      const storedUser = JSON.parse(localStorage.getItem("CurrentUser") || "null");
      if (!storedUser) return;

      const avatarList = await userApi.getAvatar();
      setAvatars(avatarList.avatars);

      setUser(storedUser);
      setFirstName(storedUser.firstName);
      setLastName(storedUser.lastName);
      setEmail(storedUser.email);
      setRole(storedUser.role);
      setSelectedAvatar(storedUser.avatar);
    };

    fetchUserAndAvatars();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    //   const updatedUser: Partial<User> = {
    //     firstName,
    //     lastName,
    //     email,
    //     password: password || undefined, // optional
    //     role,
    //     avatar_id: selectedAvatar?.avatarId,
    //   };

    //   const response = await userApi.updateUser(user?.userId!, updatedUser);
    //   toast.success("Profile updated!");
    //   localStorage.setItem("CurrentUser", JSON.stringify(response.user));
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Profile - Teaching Team</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password (leave blank to keep current)"
              type="password"
              className="w-full border px-4 py-2 rounded"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="tutor">Tutor</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
            </select>

            <div>
              <p className="text-sm font-medium mb-2">Choose Avatar</p>
              <div className="grid grid-cols-4 gap-2">
                {avatars.map((av) => (
                  <img
                    key={av.avatarId}
                    src={av.avatarUrl}
                    onClick={() => setSelectedAvatar(av)}
                    className={`cursor-pointer border-2 rounded-full w-20 h-20 object-cover ${
                      selectedAvatar?.avatarId === av.avatarId
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    alt="Avatar"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold rounded ${
                loading
                  ? "bg-gray-400 text-white"
                  : "bg-indigo-700 text-white hover:bg-indigo-600"
              }`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { userApi } from "@/services/api";
import { RegisterRequest } from "@/types/User";
import { Avatar } from "@/types/Avatar";

export default function SignUpPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("candidate");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
const [avatars, setAvatars] = useState<Avatar[] | null>(null);
const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
//   const avatars = [
//   "https://mighty.tools/mockmind-api/content/cartoon/11.jpg",
//   "https://mighty.tools/mockmind-api/content/cartoon/32.jpg",
//   "https://mighty.tools/mockmind-api/content/cartoon/5.jpg",
//   "https://mighty.tools/mockmind-api/content/cartoon/7.jpg",
// ];
useEffect(() => {
  const fetchData = async () => {
  const response = await userApi.getAvatar();
  const avatars = response.avatars;
  console.log('Avatars', avatars);
  setAvatars(avatars);
  }
  fetchData();
}, [])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setFormErrors({});
  const newErrors: Record<string, string> = {};

  // Client-side validations
  if (!firstName.trim()) newErrors.firstName = "First name is required.";
  if (!lastName.trim()) newErrors.lastName = "Last name is required.";
  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    newErrors.email = "Invalid email format.";
  }

  if (!password) {
    newErrors.password = "Password is required.";
  } else if (password.length < 6 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
    newErrors.password = "Password must be 6+ chars, include number & symbol.";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(newErrors).length > 0) {
    setFormErrors(newErrors);
    return;
  }

  setLoading(true);

  try {
    const user: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
      avatar_id: selectedAvatar ? selectedAvatar.avatarId : null,
    }
    const response = await userApi.createUser(user);
    console.log('Response of creating user:', response.user);
    if (response.user) {
      toast.success("Registration successful!");
      setTimeout(() => router.push("/signIn"), 1500);
    } else {
      setError(response.message || "Registration failed.");
    }
  } catch (err: any) {
    if (err.response?.message) {
      setError(err.response.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Head>
        <title>Sign Up - Teaching Team</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins px-4">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {formErrors.firstName && <p className="text-red-600 text-sm">{formErrors.firstName}</p>}
            <input
              type="text"
              placeholder="Last Name"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {formErrors.lastName && <p className="text-red-600 text-sm">{formErrors.lastName}</p>}
            <input
              type="email"
              placeholder="Email Address"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && <p className="text-red-600 text-sm">{formErrors.email}</p>}
            <select
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="candidate">Tutor Candidate</option>
              <option value="lecturer">Lecturer</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && <p className="text-red-600 text-sm">{formErrors.password}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {formErrors.confirmPassword && <p className="text-red-600 text-sm">{formErrors.confirmPassword}</p>}

            <div>
          <p className="text-sm text-gray-700 font-poppins font-bold mb-2">Choose an Avatar:</p>
  <div className="grid grid-cols-4 gap-2">
    {avatars?.map((av) => (
      <img
        key={av.avatarId}
        src={av.avatarUrl}
        onClick={() => setSelectedAvatar(av)}
        className={`cursor-pointer border-2 rounded-full w-20 h-20 object-cover ${
          selectedAvatar?.avatarUrl === av.avatarUrl ? "border-blue-500" : "border-transparent"
        }`}
        alt="Avatar option"
      />
    ))}
  </div>
</div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-2 rounded transition ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-indigo-900 text-white hover:bg-indigo-800"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signIn" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

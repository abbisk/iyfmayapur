import { registerUser } from "../utils/lmsState";
import { useState } from "react";
import { Link } from "react-router-dom";
import FadeUp from "../utils/motions/FadeUp";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [role, setRole] = useState("user");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password confirmation check helper
  const handleConfirmPasswordChange = (val) => {
    setConfirmPassword(val);
    if (val && val !== password) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await registerUser({ email, password, name, role, adminSecret });

      if (response?.error) {
        setError(response.error);
        alert(response.error);
      } else {
        localStorage.removeItem('token');
        alert("User registered successfully!");
        window.open("/login", "_self");
      }
    } catch (err) {
      const errorMessage = err?.message || "An error occurred during registration.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    !error &&
    (role !== "admin" || adminSecret);

  return (
    <FadeUp>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
        {/* Register Card */}
        <div className="w-full max-w-sm min-h-40 p-6 bg-yellow-100 rounded-xl shadow-md flex flex-col gap-4">
          
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            {/* Role Selection */}
            <div className="flex gap-2 items-center">
              <label className="text-sm font-medium text-gray-700">Role:</label>
              <select
                name="role"
                disabled={isLoading}
                className="rounded-lg p-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Form Title */}
            <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
              Welcome to LMS
            </h2>

            {/* Name Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                disabled={isLoading}
                value={name}
                className="border-2 border-black rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                className="border-2 border-black rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                disabled={isLoading}
                value={password}
                className="border-2 border-black rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (confirmPassword && e.target.value !== confirmPassword) {
                    setError("Passwords do not match");
                  } else {
                    setError(null);
                  }
                }}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                required
                disabled={isLoading}
                value={confirmPassword}
                className="border-2 border-black rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              />
            </div>

            {/* Admin Secret Field */}
            {role === "admin" && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Admin Secret</label>
                <input
                  type="password"
                  required
                  disabled={isLoading}
                  value={adminSecret}
                  className="border-2 border-black rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  onChange={(e) => setAdminSecret(e.target.value)}
                />
              </div>
            )}

            {/* Error Display */}
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            {/* Register Button with Spinner */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="bg-blue-500 text-white font-semibold rounded-lg p-2.5 mt-2 w-full hover:bg-blue-600 transition-colors cursor-pointer disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mx-auto text-sm text-gray-700">
            Already registered?{" "}
            <Link
              to="/lms/login"
              className={`text-blue-500 hover:text-blue-700 font-semibold transition-colors cursor-pointer ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </FadeUp>
  );
}
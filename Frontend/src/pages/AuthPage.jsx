import { useState } from "react";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Toaster, toast } from "sonner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
        toast.success("User Logged In Successfully ✅");
      } else {
        await signup({ name: form.name, email: form.email, password: form.password });
        toast.success("User Created Successfully 🎉");
      }

      // ✅ Clear form after success
      setForm({ name: "", email: "", password: "" });

    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Authentication failed");
      toast.error("Authentication Failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Toaster richColors position="top-center" />

      {/* Glass Card */}
      <div className="relative z-10 p-10 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 w-full max-w-md">
        
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gray-900 rounded-xl shadow-md">
            {isLogin ? (
              <LogIn className="w-7 h-7 text-white" />
            ) : (
              <UserPlus className="w-7 h-7 text-white" />
            )}
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold mb-2 text-gray-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          {isLogin ? "Login to your account" : "Sign up to get started"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Signup only) */}
          {!isLogin && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-black z-10" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required={!isLogin}
                className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-black z-10" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-black z-10" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loading..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Switch Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setForm({ name: "", email: "", password: "" }); // ✅ reset when switching
              }}
              className="text-gray-900 font-semibold hover:underline transition-all"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        {/* Forgot Password */}
        {isLogin && (
          <div className="mt-4 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

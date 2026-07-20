import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import type RegisterData from "@/models/registerData";
import { registerUser } from "@/services/authService";
import { useNavigate } from "react-router";
import Oauth2Buttons from "@/components/Oauth2Buttons";

export default function Signup() {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitted Data:");
    console.log(data);

    if (data.name.trim() === "" || data.email.trim() === "" || data.password.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await registerUser(data);
      console.log("Registration successful:", result);
      toast.success("Account created successfully!");
      setData({ 
        name: "", 
        email: "", 
        password: "" 
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Failed to create account.");
      toast.error("Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -120, 0] }}
          transition={{
            repeat: Infinity,
            duration: 14,
            ease: "easeInOut",
          }}
          className="absolute left-10 top-20 h-80 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-[120px]"
        />

        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 120, 0] }}
          transition={{
            repeat: Infinity,
            duration: 16,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-violet-500/10 dark:bg-violet-500/20 blur-[140px]"
        />
      </div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[430px] border-border/50 bg-card/80 p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-7">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg">
                <span className="text-xl font-bold">A</span>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground">
                Create Account
              </h1>

              <p className="text-muted-foreground">
                Join us and start your journey today.
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-12 pl-10"
                  value={data.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 pl-10"
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 pl-10"
                  value={data.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="group h-12 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 text-white"
            >
              {loading ? "Creating Account..." : "Continue with Email"}

              {!loading && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs  text-muted-foreground">
                  OR
                </span>
              </div>
            </div>

        <Oauth2Buttons/>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?
              <button
                type="button"
                className="ml-2 text-primary hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

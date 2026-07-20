import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, CheckCircle2Icon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert";

import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/auth/store";
import Oauth2Buttons from "@/components/Oauth2Buttons";

export default function Login() {

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate()

  const login = useAuth(state => state.login)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log("Login Data:", loginData);

    // Validation
    if (!loginData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!loginData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setLoading(true);
      // const userInfo = await loginUser(loginData);

      // console.log(userInfo);


      //login function : use auth
      await login(loginData);
      toast.success("Login successful");

      // localStorage.setItem("user", JSON.stringify(userInfo));

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error("error !!")
      if (error?.status == 400) {
        setError(error);
      }
      else {
        setError(error)
      }


    }
    finally {

      setLoading(false)

    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -120, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute left-10 top-20 h-80 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-[120px]"
        />

        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 120, 0] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-violet-500/10 dark:bg-violet-500/20 blur-[140px]"
        />

        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.03]" />
      </div>




      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[420px] border-border/50 bg-card/80 p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg">
                <span className="text-xl font-bold">A</span>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome Back
              </h1>

              <p className="text-muted-foreground">
                Sign in to continue to your account
              </p>
            </div>

            {/*error section*/}
            {error && (
              <div className="mt-6">
                <Alert variant="destructive">
                  <CheckCircle2Icon />
                  <AlertTitle>
                    {error?.response
                      ? error?.response?.data?.message
                      : error?.message}
                  </AlertTitle>

                </Alert>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  className="h-10 pl-8"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  className="h-10 pl-8"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email Button */}

            <Button disabled={loading} type="submit" className="group h-12 w-full bg-gradient-to-r cursor-pointer from-cyan-500 via-blue-500 to-violet-600 text-white hover:opacity-90">
              {loading ? (<><Spinner />Please wait...</>) : (<> login <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}



            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground">
                  OR
                </span>
              </div>
            </div>

          {/*oauth 2 buttons*/}
          <Oauth2Buttons/>



            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?
              <button className="ml-2 text-primary hover:underline">
                Sign Up
              </button>
            </p>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
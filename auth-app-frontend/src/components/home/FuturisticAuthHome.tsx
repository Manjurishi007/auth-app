import {
    ShieldCheck,
    Zap,
    Globe,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function FuturisticAuthHome() {
    return (
       <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1.0,
    ease: "easeOut",
  }}
  className="relative mx-auto max-w-7xl"
>
            {/* Background */}
            <div className="absolute inset-0">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:45px_45px]" />

                {/* Purple Glow */}
                <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-violet-600/30 blur-[120px]" />

                {/* Cyan Glow */}
                <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-[140px]" />
            </div>

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24">
                {/* Badge */}
                <Badge className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-cyan-300">
                    Secure Authentication Platform
                </Badge>

                {/* Heading */}
                <h1 className="mt-8 max-w-4xl text-center text-5xl font-extrabold leading-tight md:text-7xl">
                    Authentication
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                        Made Secure.
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-2xl text-center text-lg text-slate-400">
                    Secure your applications with JWT Authentication,
                    Google OAuth, GitHub Login, Refresh Tokens,
                    Email Verification and Role Based Access.
                </p>

                {/* login buttons */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button className="gap-2">
                        <FcGoogle size={20} />
                        Continue with Google
                    </Button>

                    <Button variant="outline" className="gap-2">
                        <FaGithub size={20} />
                        Continue with GitHub
                    </Button>
                </div>

                {/* technology badges */}



                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Badge variant="secondary">JWT</Badge>
                    <Badge variant="secondary">OAuth2</Badge>
                    <Badge variant="secondary">Refresh Tokens</Badge>
                    <Badge variant="secondary">RBAC</Badge>
                    <Badge variant="secondary">Email Verification</Badge>
                </div>

                {/* Dashboard Preview */}
                <Card className="mt-20 w-full max-w-3xl rounded-3xl border bg-background/70 border-border backdrop-blur-xl p-8 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Authentication Dashboard</h2>

                        <Badge className="bg-green-500/20 text-green-400">
                            ● Online
                        </Badge>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                            <p className="text-slate-400">Users</p>
                            <h3 className="mt-2 text-3xl font-bold">12.8K</h3>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                            <p className="text-slate-400">Sessions</p>
                            <h3 className="mt-2 text-3xl font-bold">8.4K</h3>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                            <p className="text-slate-400">Success Rate</p>
                            <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                                99.9%
                            </h3>
                        </div>
                    </div>
                </Card>

                {/* Features */}
                <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">
                    <Card className="rounded-2xl border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-500/50">
                        <ShieldCheck className="mb-4 h-10 w-10 text-cyan-400" />

                        <h3 className="text-xl font-semibold">Secure</h3>

                        <p className="mt-2 text-slate-400">
                            JWT Authentication, Refresh Tokens,
                            Email Verification and encrypted passwords.
                        </p>
                    </Card>

                    <Card className="rounded-2xl border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-500/50">
                        <Zap className="mb-4 h-10 w-10 text-violet-400" />

                        <h3 className="text-xl font-semibold">Fast</h3>

                        <p className="mt-2 text-slate-400">
                            Lightweight authentication with modern APIs
                            and seamless user experience.
                        </p>
                    </Card>

                    <Card className="rounded-2xl border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-500/50">
                        <Globe className="mb-4 h-10 w-10 text-cyan-400" />

                        <h3 className="text-xl font-semibold">OAuth2 Ready</h3>

                        <p className="mt-2 text-slate-400">
                            Login instantly with Google or GitHub and
                            integrate within minutes.
                        </p>
                    </Card>
                </div>

                {/* CTA */}
                <div className="mt-24 text-center">
                    <h2 className="text-4xl font-bold">
                        Ready to build securely?
                    </h2>

                    <p className="mt-4 text-slate-400">
                        Authenticate once. Build forever.
                    </p>

                    <Button
                        className="mt-8 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8"
                        size="lg"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
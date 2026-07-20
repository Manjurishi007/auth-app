import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Activity,
  Clock,
  TrendingUp,
  Globe,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/authService";
import useAuth from "@/auth/store";
import { useState } from "react";
import type UserT from "@/models/User";
import toast from "react-hot-toast";





function UserHome(){

  const user = useAuth(state=>state.user)
  const [user1, setUser1]=useState<UserT|null>(null)

  const getUserData=async()=>{
  try{
   const user1 =  await getCurrentUser(user?.email)
   setUser1(user1)
   toast.success("you are able to acess secured api's ")

  }
  catch(error){
    console.log(error);
    toast.error("error in getting the data")
    

  }
}
  const stats = [
    {
      title: "Total Logins",
      value: "248",
      icon: Activity,
      color: "text-cyan-500",
    },
    {
      title: "Security Score",
      value: "98%",
      icon: ShieldCheck,
      color: "text-green-500",
    },
    {
      title: "Connected Devices",
      value: "5",
      icon: Globe,
      color: "text-violet-500",
    },
    {
      title: "Active Sessions",
      value: "2",
      icon: Users,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -120, 0] }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]"
        />

        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 120, 0] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[150px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl p-8">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-muted-foreground">
            Here's what's happening with your account today.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-card/70 backdrop-blur-xl">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-muted p-3">
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Activity */}
          <Card className="col-span-2 bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Weekly Login Activity
              </h2>

              <div className="flex h-64 items-end gap-5">
                {[35, 70, 45, 90, 60, 120, 85].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-500 to-violet-600"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card className="bg-card/70 backdrop-blur-xl">
            <CardContent className="space-y-5 p-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Profile
                </h2>

                <p className="text-muted-foreground">
                  Authenticated User
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Name
                  </p>

                  <p className="font-semibold">
                    Manjunath
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Email
                  </p>

                  <p className="font-semibold">
                    manjunath@example.com
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Provider
                  </p>

                  <p className="font-semibold">
                    LOCAL
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">
                    Verified
                  </span>
                </div>
              </div>

              <Button className="w-full">
                Manage Profile
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* Recent Activity */}
        <Card className="mt-8 bg-card/70 backdrop-blur-xl">
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Recent Activity
            </h2>

            <div className="space-y-5">

              {[
                "Logged in successfully",
                "Password updated",
                "GitHub account linked",
                "Profile updated",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-none"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-cyan-500" />

                    <span>{item}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Just now
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={getUserData}>
            get current user
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          <p>
               {user1?.name} 
          </p>

          
        </div>

      </div>
    </div>
  );
}

export default UserHome
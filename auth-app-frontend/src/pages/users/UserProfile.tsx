import { useEffect, useState, type ChangeEvent } from "react";
import useAuth from "@/auth/store";
import type User from "@/models/User";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Mail,
  User as UserIcon,
  Shield,
  Calendar,
  Pencil,
  Save,
  X,
} from "lucide-react";

export default function UserProfile() {
  const user = useAuth((state) => state.user);

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState<User | null>(user);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-96">
        User not found
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev
    );
  };

  const handleSave = async () => {
    try {
      console.log(profile);

      // await updateUser(profile);

      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <Card className="shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">
            My Profile
          </CardTitle>

          {!editing ? (
            <Button onClick={() => setEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setProfile(user);
                  setEditing(false);
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-36 w-36">
                <AvatarImage src={profile.image ?? ""} />

                <AvatarFallback className="text-3xl">
                  {profile.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>

              <Badge
                variant={profile.enabled ? "default" : "destructive"}
              >
                {profile.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            {/* Right */}
            <div className="flex-1 space-y-6">
              {/* Name */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-2">
                  <UserIcon className="h-4 w-4" />
                  Name
                </label>

                {editing ? (
                  <Input
                    name="name"
                    value={profile.name ?? ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>

                <p>{profile.email}</p>
              </div>

              {/* Provider */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4" />
                  Provider
                </label>

                <Badge>{profile.provider}</Badge>
              </div>

              {/* User ID */}
              <div>
                <label className="font-medium block mb-2">
                  User ID
                </label>

                <p className="break-all text-muted-foreground">
                  {profile.id}
                </p>
              </div>

              {/* Created At */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Created At
                </label>

                <p>
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Updated At
                </label>

                <p>
                  {profile.updatedAt
                    ? new Date(profile.updatedAt).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
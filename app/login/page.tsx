"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "demo.midtrans@example.com" && password === "MidtransDemo2026!") {
      // Save fake session
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: "demo.midtrans@example.com",
          role: ":MidtransDemo2026!",
          isLoggedIn: true,
        })
      );

      router.push("/dashboard");
      return;
    }

    setError("Invalid username or password");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Sign in
            </CardTitle>
            <CardDescription>
              Login to access SEO Toolkit Dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                placeholder="admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </CardContent>

          {/* <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Demo Login
              <br />
              <span className="font-medium">
                Username: admin
              </span>
              <br />
              <span className="font-medium">
                Password: admin123
              </span>
            </div>
          </CardFooter> */}
        </form>
      </Card>
    </div>
  );
}
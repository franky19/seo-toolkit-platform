import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Enter your email and password to access SEO Toolkit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Sign in</Button>
          <div className="text-sm text-center text-muted-foreground">
            Dont have an account?{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

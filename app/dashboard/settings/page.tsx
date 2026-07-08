import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your account and application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="john.doe@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" value="Example Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value="Administrator" readOnly />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Application Preferences</CardTitle>
          <CardDescription>Customize your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select defaultValue="system">
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notifications</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Toggle id="email-notifications" aria-label="Toggle email notifications" defaultPressed />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Toggle id="in-app-notifications" aria-label="Toggle in-app notifications" />
                  <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
               <Label htmlFor="language">Language</Label>
               <Select defaultValue="en">
                 <SelectTrigger>
                   <SelectValue placeholder="Select language" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="en">English</SelectItem>
                   <SelectItem value="es">Español</SelectItem>
                   <SelectItem value="fr">Français</SelectItem>
                 </SelectContent>
               </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

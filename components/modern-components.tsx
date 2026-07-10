import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Menu, User, FileText, Bell } from "lucide-react";

/**
 * Modern UI Dashboard Shell component combining the requested imports
 */
export function ModernDashboardShell({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-8">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" className="md:hidden mr-4">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="font-bold text-lg mb-6">SEO Toolkit</div>
              {/* Add mobile links here */}
            </SheetContent>
          </Sheet>
          
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Notifications", description: "No new updates." })}>
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto py-8 px-4 md:px-8">
        {children}
      </main>
    </div>
  );
}

/**
 * Reusable Modern Content Form
 */
export function ModernContentForm() {
  return (
    <div className="space-y-4 p-6 border rounded-xl bg-card shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="content-input">Generate Content</Label>
        <Textarea id="content-input" placeholder="Type your ideas here..." className="min-h-[200px]" />
      </div>
      <Button>Generate Analysis</Button>
    </div>
  );
}

/**
 * Modern Data Table
 */
export function FeaturesSection() {
  return <section className="py-20 text-center">Features Placeholder</section>;
}

export function WhyNotAppearingSection() {
  return <section className="py-20 text-center">Why Not Appearing Placeholder</section>;
}

export function HeroModern() {
  return <section className="py-20 text-center">Hero Placeholder</section>;
}

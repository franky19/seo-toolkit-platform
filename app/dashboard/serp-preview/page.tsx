import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";

export default function SerpPreviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">SERP Preview</h1>
        <p className="text-muted-foreground">See how your page will look in search results.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your URL</CardTitle>
          <CardDescription>Paste the URL of the page you want to preview.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" placeholder="https://example.com/your-page" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Meta Title</Label>
              <Input id="title" placeholder="Your page title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                placeholder="Your page meta description"
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Generate Preview</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SERP Preview</CardTitle>
          <CardDescription>This is how your page might appear on Google.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-lg text-blue-600 hover:underline dark:text-blue-400">
              <a href="#" onClick={(e) => e.preventDefault()}> 
                <span className="font-semibold">Example SEO Title - YourSite.com</span>
              </a>
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">https://example.com/your-page</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              This is an example meta description that is informative and enticing to users, encouraging them to click on your link in the search results.
            </div>
            <div className="mt-4 flex justify-end">
               <CopyButton text="Copy Preview Link (Not functional)" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

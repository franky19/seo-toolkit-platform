import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button"; // Assuming a CopyButton component exists

export default function MetaGeneratorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meta Generator</h1>
        <p className="text-muted-foreground">Generate optimized meta titles and descriptions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Details</CardTitle>
          <CardDescription>Provide information about your page content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="page-title">Page Title</Label>
              <Input id="page-title" placeholder="e.g., Ultimate Guide to SEO" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Target Keywords</Label>
              <Input id="keywords" placeholder="e.g., SEO, digital marketing, link building" />
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <Label htmlFor="page-content">Page Content Summary</Label>
              <Textarea
                id="page-content"
                placeholder="Briefly describe the content of your page..."
                rows={4}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Generate Meta Tags</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Meta Tags</CardTitle>
          <CardDescription>Copy the generated tags to your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="meta-title">Meta Title</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="meta-title"
                  value="The Ultimate Guide to SEO: Strategies & Tips | YourBrand"
                  readOnly
                  className="mt-1"
                />
                <CopyButton text="The Ultimate Guide to SEO: Strategies & Tips | YourBrand" />
              </div>
            </div>
            <div>
              <Label htmlFor="meta-description">Meta Description</Label>
              <div className="flex items-center space-x-2">
                <Textarea
                  id="meta-description"
                  value="Discover essential SEO strategies and tips to boost your website's visibility. Learn about keyword research, on-page optimization, link building, and more."
                  readOnly
                  rows={3}
                  className="mt-1"
                />
                <CopyButton text="Discover essential SEO strategies and tips to boost your website's visibility. Learn about keyword research, on-page optimization, link building, and more."
                 />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

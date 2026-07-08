/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AiContentHelperPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Content Helper</h1>
        <p className="text-muted-foreground">
          Let AI assist you in creating compelling content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Generation</CardTitle>
          <CardDescription>Describe what you need help with.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic or Subject</Label>
              <Input
                id="topic"
                placeholder="e.g., Benefits of Cloud Computing"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Target Keywords</Label>
              <Input
                id="keywords"
                placeholder="e.g., cloud computing, SaaS, scalability"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contentType">Content Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog-post">Blog Post</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="product-description">
                    Product Description
                  </SelectItem>
                  <SelectItem value="social-media">
                    Social Media Post
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Tone of Voice</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="witty">Witty</SelectItem>
                  <SelectItem value="informative">Informative</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <Label htmlFor="additional-instructions">
                Additional Instructions
              </Label>
              <Textarea
                id="additional-instructions"
                placeholder="Any specific points to include or avoid? Any structure preferences?"
                rows={4}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Generate Content</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Content</CardTitle>
          <CardDescription>
            Review and refine the AI-generated content below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold">
                The Benefits of Cloud Computing
              </h2>
              <p className="text-muted-foreground">
                Published on: October 26, 2023
              </p>
              <p>
                Cloud computing offers a plethora of benefits for businesses of
                all sizes. From enhanced scalability and flexibility to cost
                savings and improved collaboration, the advantages are
                significant...
              </p>
              <h3 className="text-xl font-semibold">
                Scalability and Flexibility
              </h3>
              <p>
                One of the primary advantages of cloud computing is its inherent
                scalability and flexibility. Businesses can easily scale their
                resources up or down based on demand, ensuring they only pay for
                what they use...
              </p>
              <h3 className="text-xl font-semibold">Cost Savings</h3>
              <p>
                By opting for cloud solutions, companies can reduce their
                capital expenditure on hardware and infrastructure. Operational
                costs are also lowered due to reduced energy consumption and IT
                maintenance...
              </p>
              {/* More content here */}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Regenerate</Button>
              <Button>Copy Content</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function KeywordResearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Keyword Research</h1>
        <p className="text-muted-foreground">
          Find valuable keywords to boost your SEO efforts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Input</CardTitle>
          <CardDescription>
            Enter a seed keyword or URL to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="keyword">Seed Keyword</Label>
              <Input id="keyword" placeholder="e.g., digital marketing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Or URL</Label>
              <Input id="url" placeholder="e.g., https://example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Analyze Keywords</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Results</CardTitle>
          <CardDescription>
            Keywords related to your seed input.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>CPC</TableHead>
                <TableHead>Intent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  digital marketing strategies
                </TableCell>
                <TableCell>10,000</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>$2.50</TableCell>
                <TableCell>Informational</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  best digital marketing tools
                </TableCell>
                <TableCell>8,000</TableCell>
                <TableCell>High</TableCell>
                <TableCell>$3.00</TableCell>
                <TableCell>Commercial</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  learn digital marketing online
                </TableCell>
                <TableCell>12,000</TableCell>
                <TableCell>Low</TableCell>
                <TableCell>$1.50</TableCell>
                <TableCell>Informational</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

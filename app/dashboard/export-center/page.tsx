/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Download } from "lucide-react";

export default function ExportCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Export Center</h1>
        <p className="text-muted-foreground">
          Download your data and reports in various formats.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>
            Select the data you wish to export and the format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="export-data">Data to Export</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keyword-data">
                    Keyword Research Data
                  </SelectItem>
                  <SelectItem value="meta-generated">
                    Meta Descriptions
                  </SelectItem>
                  <SelectItem value="serp-reports">SERP Reports</SelectItem>
                  <SelectItem value="ai-content">AI Content History</SelectItem>
                  <SelectItem value="all">All Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="export-format">Export Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">XLSX</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button leftIcon={<Download className="h-4 w-4 mr-2" />}>
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
          <CardDescription>View your past data exports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Date Exported</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  keyword_data_20231026.csv
                </TableCell>
                <TableCell>2023-10-26</TableCell>
                <TableCell>CSV</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  ai_content_history_20231025.json
                </TableCell>
                <TableCell>2023-10-25</TableCell>
                <TableCell>JSON</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

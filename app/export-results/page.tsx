"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Loader2 } from "lucide-react";

async function fetchExports() {
  const res = await fetch("/api/mock/exports");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function ExportResultsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["exports"],
    queryFn: fetchExports,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Export Results</h1>
      <Card>
        <CardHeader><CardTitle>Reports History</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-10"><Loader2 className="animate-spin h-8 w-8" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

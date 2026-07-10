"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

async function fetchKeywords(q: string) {
  const res = await fetch(`/api/mock/keywords?q=${q}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function KeywordResearchPage() {
  const [query, setQuery] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["keywords", query],
    queryFn: () => fetchKeywords(query),
    enabled,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Keyword Research</h1>
      <Card>
        <CardHeader>
          <CardTitle>Find Keywords</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input 
            placeholder="Enter keyword (e.g. best gaming laptop)" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={() => setEnabled(true)} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Analyze"}
          </Button>
        </CardContent>
      </Card>

      {data && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>CPC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item: any) => (
                <TableRow key={item.keyword}>
                  <TableCell className="font-medium">{item.keyword}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.difficulty}</TableCell>
                  <TableCell>${item.cpc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

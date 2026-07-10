"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SERPPreviewPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePreview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/mock/serp-preview", { method: "POST" });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">SERP Preview</h1>
      <Card>
        <CardHeader><CardTitle>Google Search Preview</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handlePreview} className="space-y-4">
            <div className="space-y-2">
              <Label>URL</Label>
              <Input placeholder="https://example.com" />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Page Title" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Page Description" />
            </div>
            <Button disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "Check Preview"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {result && (
        <Card>
          <CardHeader><CardTitle>Optimization Score: {result.score}</CardTitle></CardHeader>
          <CardContent>
            {result.warnings.map((w: string, i: number) => <p key={i} className="text-sm text-yellow-600">⚠ {w}</p>)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

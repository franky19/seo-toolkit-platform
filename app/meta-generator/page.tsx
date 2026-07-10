"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MetaGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/mock/meta-generator", {
        method: "POST",
        body: JSON.stringify({ keyword: "example" }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      toast({ title: "Error", description: "Failed to generate", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Meta Generator</h1>
      <Card>
        <CardHeader><CardTitle>Generate Meta Tags</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-2">
              <Label>Article Title</Label>
              <Input placeholder="Enter title" required />
            </div>
            <Button disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "Generate"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {result && (
        <Card>
          <CardHeader><CardTitle>Result (Score: {result.score})</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><strong>Title:</strong> {result.title}</div>
            <div><strong>Description:</strong> {result.description}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

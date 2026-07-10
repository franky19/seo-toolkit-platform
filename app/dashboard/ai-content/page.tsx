"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, BookText, PenLine, Scissors, Expand, SpellCheck, HelpCircle, Heading, Zap } from "lucide-react";

const aiFeatures = [
  { name: "Generate Outline", icon: BookText },
  { name: "Improve Paragraph", icon: Sparkles },
  { name: "Rewrite", icon: PenLine },
  { name: "Shorten", icon: Scissors },
  { name: "Expand", icon: Expand },
  { name: "Fix Grammar", icon: SpellCheck },
  { name: "Generate FAQ", icon: HelpCircle },
  { name: "Generate Headings", icon: Heading },
  { name: "Generate CTA", icon: Zap },
];

export default function AIContentHelperPage() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("Start writing your content here...");
  const [aiResult, setAiResult] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mock/ai-content", {
        method: "POST",
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      setAiResult(data.content);
    } catch (error) {
      console.error("Failed to generate AI content:", error);
      setAiResult("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed 200 wpm

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Content Helper</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Content Editor</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px]"
                placeholder="Start writing your content here..."
              />
            </CardContent>
          </Card>
          {aiResult && (
            <Card>
              <CardHeader><CardTitle>AI Generated Content</CardTitle></CardHeader>
              <CardContent>{aiResult}</CardContent>
            </Card>
          )}
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>AI Suggestions</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {aiFeatures.map((feature) => (
                <Button
                  key={feature.name}
                  variant="outline"
                  className="flex flex-col h-24 items-center justify-center text-center p-2"
                  onClick={handleGenerateAI}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5 mb-2" /> : <feature.icon className="h-5 w-5 mb-2" />}
                  <span className="text-xs">{feature.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Content Stats</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div><strong>Word Count:</strong> {wordCount}</div>
              <div><strong>Reading Time:</strong> {readingTime} min</div>
              <div><strong>SEO Score:</strong> 85</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>History</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Generated outline (2026-07-09)</li>
                <li>Rewrote paragraph (2026-07-09)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

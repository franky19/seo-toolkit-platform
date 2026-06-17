"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Search, Sparkles, CheckCircle2, AlertCircle, XCircle, Loader2 } from "lucide-react";
import { RateLimiter } from "@/lib/rate-limiter";
import { AuditReport, AuditStatus } from "@/types";
import { getScoreColor, getScoreGradient, getStatusColor, isValidUrl } from "@/lib/utils";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);

  const handleAudit = async () => {
    setError(null);

    // Validate URL
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    // Check rate limit
    const rateLimit = RateLimiter.checkLimit();
    if (!rateLimit.allowed) {
      setError(`Rate limit exceeded. You can perform ${rateLimit.remaining} more audits. Resets in ${RateLimiter.getRemainingTime()}`);
      return;
    }

    setLoading(true);
    setAuditReport(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to audit website");
      }

      const data: AuditReport = await response.json();
      setAuditReport(data);
      
      // Increment rate limit count after successful audit
      RateLimiter.incrementCount();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during the audit";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = ({ status }: { status: AuditStatus }) => {
    if (status === 'PASS') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (status === 'WARNING') return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Google News SEO Toolkit
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive SEO audit tool for Google News optimization, schema validation, and AI search readiness
          </p>
        </motion.div>

        {/* Main Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card className="glass border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                  className="flex-1 h-12 text-lg bg-background/50 border-purple-500/30"
                  disabled={loading}
                />
                <Button
                  onClick={handleAudit}
                  disabled={loading}
                  className="h-12 px-8 gradient-primary hover:opacity-90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze Website
                    </>
                  )}
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
              <div className="mt-4 text-sm text-gray-400 text-center">
                Free tier: {Math.max(0, 5 - RateLimiter.checkLimit().remaining)} / 5 audits used today
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audit Results */}
        {auditReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto space-y-6"
          >
            {/* Overall Score */}
            <Card className="glass border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Overall SEO Score</CardTitle>
                <CardDescription>Analyzed: {auditReport.url}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(auditReport.overallScore)}`}>
                      {auditReport.overallScore}
                    </div>
                    <div className="text-gray-400 mt-2">out of 100</div>
                  </div>
                  <Progress 
                    value={auditReport.overallScore} 
                    className={`h-3 bg-gradient-to-r ${getScoreGradient(auditReport.overallScore)}`}
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(auditReport.technicalSEOScore)}`}>
                        {auditReport.technicalSEOScore}
                      </div>
                      <div className="text-sm text-gray-400">Technical SEO</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(auditReport.schemaScore)}`}>
                        {auditReport.schemaScore}
                      </div>
                      <div className="text-sm text-gray-400">Schema</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(auditReport.googleNewsScore)}`}>
                        {auditReport.googleNewsScore}
                      </div>
                      <div className="text-sm text-gray-400">Google News</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(auditReport.aiSearchScore)}`}>
                        {auditReport.aiSearchScore}
                      </div>
                      <div className="text-sm text-gray-400">AI Search</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* SEO Audit */}
              <Card className="glass border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Technical SEO</CardTitle>
                    <StatusIcon status={auditReport.seoAudit.meta.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-400">Title</div>
                      <div className="text-white truncate">{auditReport.seoAudit.meta.data.title || 'Missing'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-400">Description</div>
                      <div className="text-white text-sm line-clamp-2">{auditReport.seoAudit.meta.data.description || 'Missing'}</div>
                    </div>
                    {auditReport.seoAudit.meta.issues.length > 0 && (
                      <div className="pt-2 border-t border-gray-700">
                        <div className="text-sm font-medium text-red-400">Issues:</div>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-1">
                          {auditReport.seoAudit.meta.issues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Google News */}
              <Card className="glass border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Google News</CardTitle>
                    <StatusIcon status={auditReport.googleNewsAudit.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">NewsArticle Schema</span>
                      <span className={auditReport.googleNewsAudit.hasNewsArticleSchema ? 'text-green-500' : 'text-red-500'}>
                        {auditReport.googleNewsAudit.hasNewsArticleSchema ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Author</span>
                      <span className="text-white text-sm">{auditReport.googleNewsAudit.author || 'Missing'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Publisher</span>
                      <span className="text-white text-sm">{auditReport.googleNewsAudit.publisher || 'Missing'}</span>
                    </div>
                    {auditReport.googleNewsAudit.issues.length > 0 && (
                      <div className="pt-2 border-t border-gray-700">
                        <div className="text-sm font-medium text-red-400">Issues:</div>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-1">
                          {auditReport.googleNewsAudit.issues.slice(0, 3).map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Schema Validation */}
              <Card className="glass border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Schema Validation</CardTitle>
                    <StatusIcon status={auditReport.schemaValidation.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-400">
                      Found {auditReport.schemaValidation.schemas.length} schema(s)
                    </div>
                    <div className="space-y-2">
                      {['Organization', 'Article', 'NewsArticle', 'Website', 'Breadcrumb'].map((schema) => {
                        const hasSchema = auditReport.schemaValidation[`has${schema}` as keyof typeof auditReport.schemaValidation];
                        return (
                          <div key={schema} className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">{schema}</span>
                            <span className={hasSchema ? 'text-green-500' : 'text-gray-500'}>
                              {hasSchema ? '✓' : '✗'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Search */}
              <Card className="glass border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">AI Search Readiness</CardTitle>
                    <StatusIcon status={auditReport.aiSearchAudit.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Schema Completeness</span>
                        <span className="text-white text-sm">{auditReport.aiSearchAudit.schemaCompleteness}%</span>
                      </div>
                      <Progress value={auditReport.aiSearchAudit.schemaCompleteness} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">FAQ Schema</span>
                        <span className={auditReport.aiSearchAudit.hasFAQSchema ? 'text-green-500' : 'text-gray-500'}>
                          {auditReport.aiSearchAudit.hasFAQSchema ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">llms.txt</span>
                        <span className={auditReport.aiSearchAudit.hasLlmsTxt ? 'text-green-500' : 'text-gray-500'}>
                          {auditReport.aiSearchAudit.hasLlmsTxt ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">ai.txt</span>
                        <span className={auditReport.aiSearchAudit.hasAiTxt ? 'text-green-500' : 'text-gray-500'}>
                          {auditReport.aiSearchAudit.hasAiTxt ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            {auditReport.recommendations.length > 0 && (
              <Card className="glass border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Recommendations</CardTitle>
                  <CardDescription>Prioritized action items to improve your SEO</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditReport.recommendations.slice(0, 8).map((rec, i) => (
                      <div key={i} className="border-l-4 border-purple-500 pl-4 py-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                rec.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                                rec.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {rec.priority}
                              </span>
                              <h4 className="font-semibold text-white">{rec.title}</h4>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{rec.description}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              <span className="font-medium">Impact:</span> {rec.impact}
                            </div>
                            <div className="text-xs text-cyan-400 mt-1">
                              <span className="font-medium">Action:</span> {rec.action}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Features */}
        {!auditReport && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-16"
          >
            <Card className="glass border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">SEO Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Complete technical SEO analysis including meta tags, indexability, and social media optimization.
                </p>
              </CardContent>
            </Card>
            <Card className="glass border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Google News Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Validate NewsArticle schema, author info, publication dates, and Google News compliance.
                </p>
              </CardContent>
            </Card>
            <Card className="glass border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">AI Search Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Check readiness for ChatGPT, Gemini, Perplexity with schema completeness and entity SEO.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}

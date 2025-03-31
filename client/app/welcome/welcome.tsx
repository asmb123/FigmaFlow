import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Loader2, Code2, ArrowRight } from "lucide-react";

interface ParsedFigmaUrl {
  fileKey: string;
  nodeId?: string;
  title?: string;
  valid: boolean;
}

export default function FigmaToCode() {
  const [figmaUrl, setFigmaUrl] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<String | null>(null);
  const [parsedData, setParsedData] = useState<ParsedFigmaUrl | null>(null);

  const parseFigmaUrl = (url: string): ParsedFigmaUrl => {
    setUrlError(null);

    try {
      if (!url.trim()) {
        alert("Not valid url");
      }
      if (!url.includes('/figma/file')) {
        alert("Invalid url");
      }

      const urlObject = new URL(url);
      const path = urlObject.pathname;
      const patharr = path.split('/');
      console.log(patharr[0]);
      const fileKey = patharr[2];
      const title = patharr[3];
      const nodeId = urlObject.searchParams.get('node-id') || undefined

      return {
        fileKey,
        nodeId,
        title,
        valid: true
      }

    } catch (error) {
      console.log(error);
    }
    return {
      fileKey: "",
      valid: false
    };
  }

  const handleGenerateCode = async (): Promise<void> => {
    setLoading(true);
    setTimeout(() => {
      setCode("// Generated code will appear here...");
      setLoading(false);
    }, 2000);
    const parsedUrl=parseFigmaUrl(figmaUrl)
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-indigo-950 to-slate-900">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="border-0 shadow-xl bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-2xl font-bold text-white">
              <Code2 className="mr-2 h-6 w-6 text-indigo-400" />
              Figma to Code Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter Figma URL..."
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-indigo-500"
              />
            </div>
            <Button
              onClick={handleGenerateCode}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Generate Code</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {code && (
          <Card className="border-0 shadow-xl bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white">Generated Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-900 p-4 overflow-auto">
                <pre className="text-sm text-indigo-100 font-mono">{code}</pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Link, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
  if (!url.trim()) {
    toast({
      title: "Error",
      description: "Please enter a URL to shorten",
      variant: "destructive",
    });
    return;
  }

  if (!isValidUrl(url)) {
    toast({
      title: "Invalid URL",
      description: "Please enter a valid URL (include http:// or https://)",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post("http://localhost:8080/submitUrl", { url });
    const shortUrl = response.data;
    setShortenedUrl(shortUrl);
    toast({
      title: "Success!",
      description: "URL shortened successfully",
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Failed to shorten URL. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Shortened URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const openUrl = () => {
    window.open(shortenedUrl, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Section */}
      <Card className="bg-gradient-card border-border/50 shadow-glow">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Link className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  URL Shortener
                </h2>
              </div>
              <p className="text-muted-foreground">
                Transform your long URLs into short, shareable links
              </p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="https://example.com/very-long-url..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleShorten()}
                />
              </div>
              <Button 
                onClick={handleShorten}
                disabled={isLoading}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isLoading ? "Shortening..." : "Shorten"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {shortenedUrl && (
        <Card className="bg-gradient-card border-border/50 shadow-glow animate-in slide-in-from-bottom-4 duration-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">URL shortened successfully!</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Original URL:</label>
                  <p className="text-sm break-all text-foreground/80 bg-background/30 p-2 rounded border border-border/30">
                    {url}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Shortened URL:</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-background/30 p-2 rounded border border-border/30">
                      <span className="text-primary font-medium break-all">
                        {shortenedUrl}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="shrink-0 border-primary/50 hover:bg-primary/10"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={openUrl}
                      className="shrink-0 border-primary/50 hover:bg-primary/10"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UrlShortener;